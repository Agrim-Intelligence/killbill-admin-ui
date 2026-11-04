import * as fs from "node:fs";
import * as path from "node:path";
import { test } from "@playwright/test";

// A name, never a path: it is spliced into env/<environment>.values.json.
const ENVIRONMENT = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;
const ENVIRONMENT_RULE = 'letters, digits, "-" or "_", starting with a letter or digit';
const CREDENTIAL_SET = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
type Reference = { credential: string };

function reason(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function testInfo() {
  try {
    return test.info();
  } catch {
    throw new Error("Test data: read test data inside a test body - the environment is chosen per test.");
  }
}

function environment(info: ReturnType<typeof testInfo>): string | undefined {
  const named: unknown = info.project.metadata.environment;
  if (named !== undefined) {
    if (typeof named !== "string" || !ENVIRONMENT.test(named)) {
      throw new Error(`Test data: metadata.environment of Playwright project "${info.project.name}" must be an environment name (${ENVIRONMENT_RULE}).`);
    }
    return named;
  }
  const chosen = process.env.OMEGA_TEST_ENV;
  if (!chosen) {
    return undefined;
  }
  if (!ENVIRONMENT.test(chosen)) {
    throw new Error(`Test data: OMEGA_TEST_ENV "${chosen}" must be an environment name (${ENVIRONMENT_RULE}).`);
  }
  return chosen;
}

function quoted(keys: string[]): string {
  return keys.map((key) => `"${key}"`).join(", ");
}

function load(info: ReturnType<typeof testInfo>, env: string, needed: string[]): { file: string; values: Map<string, string | Reference> } {
  const file = `env/${env}.values.json`;
  // The test-repo root is where the Playwright config is, whatever the cwd.
  const root = info.config.configFile ? path.dirname(info.config.configFile) : process.cwd();
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    throw new Error(`Test data: ${file} not found next to the Playwright config - create it from env/example.values.json so ${quoted(needed)} can be read.`);
  }
  let text = "";
  try {
    text = fs.readFileSync(full, "utf8");
  } catch (err) {
    throw new Error(`Test data: ${file} could not be read (${reason(err)}).`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    // The parser's message quotes the file around the error, which may be a password.
    throw new Error(`Test data: ${file} is not valid JSON - fix it so it is one {"<name>": "<value>"} object.`);
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Test data: ${file} is not valid JSON of the form {"<name>": "<value>"} - it must be an object.`);
  }
  const values = new Map<string, string | Reference>();
  for (const [name, value] of Object.entries(parsed)) {
    if (typeof value === "string") {
      values.set(name, value);
      continue;
    }
    const isReference =
      value !== null && typeof value === "object" && !Array.isArray(value) &&
      Object.keys(value).length === 1 && typeof value.credential === "string";
    if (!isReference) {
      throw new Error(`Test data: "${name}" in ${file} must be text, or {"credential": "<set>"} for a password.`);
    }
    // Not echoed: a set name that breaks the rule may be a password typed in its place.
    if (!CREDENTIAL_SET.test(value.credential)) {
      throw new Error(`Test data: "${name}" in ${file} does not name a valid credential set - a set name is lowercase letters and digits, joined by "-".`);
    }
    values.set(name, { credential: value.credential });
  }
  // A password typed under any name, or as a set name, is refused before any message
  // can echo it; the message names the variable, never the value. The file is shared
  // by every test, so this holds in a test without a password field too.
  for (const [variable, secret] of Object.entries(process.env)) {
    if (!secret || !variable.startsWith("TARGET_APP_") || !variable.includes("PASSWORD")) {
      continue;
    }
    for (const [name, value] of values) {
      if ((typeof value === "string" ? value : value.credential) === secret) {
        throw new Error(`Test data: "${name}" in ${file} holds the value of ${variable} - a values file names a credential set, never the password itself.`);
      }
    }
  }
  return { file, values };
}

// `needed` is every key the caller will read, so a missing file or environment names them all at once.
function required(key: string, what: string, needed: string[] = [key]): { file: string; value: string } {
  const info = testInfo();
  const env = environment(info);
  if (env === undefined) {
    throw new Error(`Test data: no environment chosen - set "environment" in this Playwright project's metadata, or set OMEGA_TEST_ENV, so ${quoted(needed)} can be read from env/<environment>.values.json.`);
  }
  const { file, values } = load(info, env, needed);
  const value = values.get(key);
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`Test data: "${key}" in ${file} is not a password field - give its value as text.`);
  }
  if (value === undefined || value.trim() === "") {
    throw new Error(`Test data: "${key}" is not set in ${file} - add ${what}.`);
  }
  return { file, value };
}

export function recordRoute(template: string, pageClass: string): string {
  // Every id the route needs is named in one message, so the operator fixes the values file once, not once per run.
  const keys = [...new Set([...template.matchAll(/\{([a-z][a-z0-9]*)\}/g)].map((m) => `${pageClass}.${m[1]}`))];
  const what =
    keys.length === 1
      ? `the id of a ${pageClass} record that exists in this environment`
      : `whichever of the ids this route needs are missing: ${quoted(keys)}`;
  return template.replace(/\{([a-z][a-z0-9]*)\}/g, (_match, name: string) => {
    const key = `${pageClass}.${name}`;
    const { file, value } = required(key, what, keys);
    if (/[\/?#]/.test(value)) {
      throw new Error(`Test data: "${key}" in ${file} must be a plain id without "/", "?" or "#".`);
    }
    return encodeURIComponent(value);
  });
}

const PASSWORD_WORD = /password|passcode|passphrase|\bpwd\b|\bpass\b/i;
const DEFAULT_PASSWORD = "TARGET_APP_PASSWORD";
const SLOT = Symbol("credential");
type Credential = { readonly [SLOT]: true };
type Fallback = string | Credential;

// A password field: the value comes from a credential set at run time, never from a file.
export function credential(): Credential {
  return { [SLOT]: true };
}

function password(set: string): string {
  const variable = set === "default" ? DEFAULT_PASSWORD : `TARGET_APP_${set.toUpperCase().replace(/-/g, "_")}_PASSWORD`;
  const value = process.env[variable];
  if (!value) {
    throw new Error(`Test data: set ${variable} (the password of credential set "${set}") before running this test.`);
  }
  return value;
}

function named(key: string, param: string, fallback: Fallback): string {
  const slot = typeof fallback !== "string" || PASSWORD_WORD.test(param);
  const otherwise = () => (typeof fallback === "string" ? fallback : password("default"));
  const found = override(key);
  if (found === undefined) {
    return otherwise();
  }
  const { file, value } = found;
  if (typeof value !== "string") {
    if (!slot) {
      throw new Error(`Test data: "${key}" in ${file} is not a password field - give its value as text.`);
    }
    return password(value.credential);
  }
  if (slot) {
    throw new Error(`Test data: "${key}" in ${file} is a password field - name a credential set there, {"credential": "<set>"}, never the password itself.`);
  }
  return value;
}

type Defaults = Record<string, Record<string, Fallback>>;
type Resolved<T extends Defaults> = { readonly [G in keyof T]: { readonly [P in keyof T[G]]: string } };

// The environment file's entry for key; none when no environment is chosen.
function override(key: string): { file: string; value: string | Reference } | undefined {
  const info = testInfo();
  const env = environment(info);
  if (env === undefined) {
    return undefined;
  }
  const { file, values } = load(info, env, [key]);
  const value = values.get(key);
  return value === undefined ? undefined : { file, value };
}

// Defaults stay in this file; env/<environment>.values.json overrides any of them by
// "<feature>.<group>.<name>". Getters, so each read happens inside the test body.
export function testData<T extends Defaults>(byFeature: Record<string, T>): Resolved<T> {
  const groups: Record<string, Record<string, string>> = {};
  for (const [feature, defaults] of Object.entries(byFeature)) {
    for (const [group, params] of Object.entries(defaults)) {
      const resolved: Record<string, string> = {};
      for (const [name, fallback] of Object.entries(params)) {
        Object.defineProperty(resolved, name, {
          enumerable: true,
          get: () => named(`${feature}.${group}.${name}`, name, fallback),
        });
      }
      groups[group] = resolved;
    }
  }
  return groups as Resolved<T>;
}

export const usersSignInTenantsHomeData = testData({
  "users-sign-in--tenants--home": {
    successfullySignOutAfterSelectingATenant: { username: "admin", password: credential(), kbTenantId: "Acme Test Tenant" },
  },
});
