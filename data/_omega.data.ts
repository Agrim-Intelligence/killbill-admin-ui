// Omega-managed: every delivery of a generated test rewrites this file with the
// same text. Do not edit it - the next delivery replaces it. Each
// data/<feature>/<scenario>.data.ts reads its values through it.
import * as fs from "node:fs";
import * as path from "node:path";
import { test } from "@playwright/test";

// A name, never a path: it is spliced into env/<environment>.values.json.
const ENVIRONMENT = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;
const ENVIRONMENT_RULE = 'letters, digits, "-" or "_", starting with a letter or digit';
const CREDENTIAL_SET = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
// The one environment Omega's own Run script writes: its test data lives in Settings, not in a repo file.
const RUN_SCRIPT_ENVIRONMENT = "target-app";
// A secret reference names a withheld non-password value (one-time code, PIN, API key, token); output-contract §2.1.
const SECRET_NAME = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;
type Reference = { credential: string } | { secret: string };

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
    if (env === RUN_SCRIPT_ENVIRONMENT) {
      throw new Error(`Test data: the test data saved in Omega was not found - save ${quoted(needed)} in Settings so it can be read.`);
    }
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
    const single = value !== null && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 1;
    if (single && typeof value.secret === "string") {
      // Not echoed, and never a password's variable: a password goes through a credential set.
      if (!SECRET_NAME.test(value.secret) || value.secret.length > 60 || /PASSWORD|^USERNAME$/.test(value.secret)) {
        throw new Error(`Test data: "${name}" in ${file} does not name a valid secret - a secret name is capital letters and digits, joined by "_", and never a password or username.`);
      }
      values.set(name, { secret: value.secret });
      continue;
    }
    if (!(single && typeof value.credential === "string")) {
      throw new Error(`Test data: "${name}" in ${file} must be text, or {"credential": "<set>"} for a password, or {"secret": "<NAME>"} for a code, PIN, key or token.`);
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
      if ((typeof value === "string" ? value : "secret" in value ? value.secret : value.credential) === secret) {
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
    throw new Error(`Test data: no environment chosen - set "environment" in this Playwright project's metadata, or set OMEGA_TEST_ENV, so ${quoted(needed)} can be read from env/<environment>.values.json. In Omega's Run script, save the test data in Settings.`);
  }
  const { file, values } = load(info, env, needed);
  const value = values.get(key);
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`Test data: "${key}" in ${file} is not a password field - give its value as text.`);
  }
  if (value === undefined || value.trim() === "") {
    if (env === RUN_SCRIPT_ENVIRONMENT) {
      throw new Error(`Test data: "${key}" is not set in the test data saved in Omega - save ${what} in Settings.`);
    }
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
const SLOT = Symbol("credential");
type Credential = { readonly [SLOT]: true };
const WITHHELD = Symbol("withheld");
type Withheld = { readonly [WITHHELD]: true };
type Fallback = string | Credential | Withheld;

// A password field: the value comes from a credential set at run time, never from a file.
export function credential(): Credential {
  return { [SLOT]: true };
}

// A password the recording did not keep: no default, so the test fails until the values file names its credential set.
export function withheld(): Withheld {
  return { [WITHHELD]: true };
}

// A withheld non-password value, read from the machine running the test; the name was checked by `load`.
function secretValue(name: string, key: string, file: string): string {
  const variable = `TARGET_APP_${name}`;
  const value = process.env[variable];
  if (!value || value.trim() === "") {
    throw new Error(`Test data: set ${variable} (the secret that "${key}" names in ${file}) before running this test.`);
  }
  return value;
}

// The default set's variable is the scenario module's to name: see `testData`.
function password(set: string, passwordVariable: string | undefined): string {
  const variable = set === "default" ? passwordVariable : `TARGET_APP_${set.toUpperCase().replace(/-/g, "_")}_PASSWORD`;
  if (variable === undefined) {
    throw new Error(`Test data: this data module names no password variable for credential set "${set}" - regenerate the test with Omega.`);
  }
  const value = process.env[variable];
  if (!value) {
    throw new Error(`Test data: set ${variable} (the password of credential set "${set}") before running this test.`);
  }
  return value;
}

// Without a password variable the module has no password field, so no value is a slot.
function named(key: string, param: string, fallback: Fallback, passwordVariable?: string): string {
  const slot = passwordVariable !== undefined && (typeof fallback !== "string" || PASSWORD_WORD.test(param));
  const found = override(key);
  if (found === undefined) {
    if (typeof fallback === "string") {
      return fallback;
    }
    if (WITHHELD in fallback) {
      // The key is absent, so `required` always throws, with the no-environment / not-set wording a QA already knows from record ids.
      return required(key, 'the credential set of this password, {"credential": "<set>"} (its password is read from TARGET_APP_<SET>_PASSWORD when the test runs)').value;
    }
    return password("default", passwordVariable);
  }
  const { file, value } = found;
  if (typeof value !== "string") {
    if ("secret" in value) {
      if (slot) {
        throw new Error(`Test data: "${key}" in ${file} is a password field - name a credential set there, {"credential": "<set>"}, never a secret.`);
      }
      return secretValue(value.secret, key, file);
    }
    if (!slot) {
      throw new Error(`Test data: "${key}" in ${file} is not a password field - give its value as text.`);
    }
    return password(value.credential, passwordVariable);
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

// Defaults stay in the scenario's module; env/<environment>.values.json overrides any of
// them by "<feature>.<group>.<name>". Getters, so each read happens inside the test body.
// `passwordVariable` is given only by a module with a password field.
export function testData<T extends Defaults>(byFeature: Record<string, T>, passwordVariable?: string): Resolved<T> {
  const groups: Record<string, Record<string, string>> = {};
  for (const [feature, defaults] of Object.entries(byFeature)) {
    for (const [group, params] of Object.entries(defaults)) {
      const resolved: Record<string, string> = {};
      for (const [name, fallback] of Object.entries(params)) {
        Object.defineProperty(resolved, name, {
          enumerable: true,
          get: () => named(`${feature}.${group}.${name}`, name, fallback, passwordVariable),
        });
      }
      groups[group] = resolved;
    }
  }
  return groups as Resolved<T>;
}

const VALUE_MISSING = "omega-value-missing";
type Pointer = { readonly config: string };
type RowDefaults = Record<string, Record<string, Fallback | null | Pointer>>;
type RowResolved<T extends RowDefaults> = { readonly [G in keyof T]: { readonly [P in keyof T[G]]: string } };

// The one reader of a value with no default. A missing one marks the test with the
// key only, so a fleet run can block the result instead of reading it as the app
// failing; no value is ever filled in, and no other environment's file is read.
function noDefault(key: string): string {
  const info = testInfo();
  const env = environment(info);
  const found = env === undefined ? undefined : override(key);
  if (env !== undefined && (found === undefined || (typeof found.value === "string" && found.value.trim() === ""))) {
    info.annotations.push({ type: VALUE_MISSING, description: key });
    throw new Error(`Test data: value missing for this client - "${key}" has no value for environment ${env}. Ask the project owner to save a value for "${key}" for this client in the saved test data (env/${env}.values.json); this value has no default, so the test cannot run without it.`);
  }
  // No environment, a non-text value, or an absent or malformed file: the errors of
  // required() and load(), unchanged.
  return required(key, "its value for this environment").value;
}

// Like testData, for the groups of a journey's data rows.
export function rowData<T extends RowDefaults>(byFeature: Record<string, T>, variable?: string): RowResolved<T> {
  const groups: Record<string, Record<string, string>> = {};
  for (const [feature, defaults] of Object.entries(byFeature)) {
    for (const [group, params] of Object.entries(defaults)) {
      const resolved: Record<string, string> = {};
      for (const [name, fallback] of Object.entries(params)) {
        const key = `${feature}.${group}.${name}`;
        Object.defineProperty(resolved, name, {
          enumerable: true,
          get: () =>
            fallback === null
              ? noDefault(key)
              : typeof fallback === "object" && "config" in fallback
                ? noDefault(fallback.config)
                : named(key, name, fallback, variable),
        });
      }
      groups[group] = resolved;
    }
  }
  return groups as RowResolved<T>;
}

const LINK = /^[a-z0-9][a-z0-9_-]{0,62}$/;
const NEED = /^[a-z0-9]+(?:[ -][a-z0-9]+)*$/;
// The server's `usable_id` rule: 1 to 2^7 characters, so no recorded-looking number is written.
const RECORD_ID = new RegExp(`^[A-Za-z0-9._~-]{1,${2 ** 7}}$`);

// The one record segment of the address, or null: no decoding, no query, no fragment.
export function recordIdFromUrl(url: string, template: string): string | null {
  let want: string[];
  let got: string[];
  try {
    got = new URL(url).pathname.split("/");
    want = template.split("/");
  } catch {
    return null;
  }
  if (want.length !== got.length) {
    return null;
  }
  let id: string | null = null;
  for (let i = 0; i < want.length; i++) {
    if (want[i] === "{record}") {
      id = got[i];
    } else if (want[i] !== got[i]) {
      return null;
    }
  }
  return id !== null && RECORD_ID.test(id) && id.replace(/\./g, "") !== "" ? id : null;
}

// Writes nothing unless the id is usable; the need then stays unchecked and its dependants stop.
export function handOffId(need: string, page: { url(): string }, template: string): void {
  const link: unknown = testInfo().project.metadata.environment;
  const dir = process.env.LEMMA_AUTH_DIR;
  const id = recordIdFromUrl(page.url(), template);
  if (id === null || typeof link !== "string" || !LINK.test(link) || !NEED.test(need) || need.length > 64) {
    return;
  }
  if (!dir || !path.isAbsolute(dir)) {
    return;
  }
  const file = path.join(dir, `${link}.records.json`);
  let ids: Record<string, string> = {};
  try {
    const found: unknown = JSON.parse(fs.readFileSync(file, "utf8"));
    if (found !== null && typeof found === "object" && !Array.isArray(found)) {
      ids = { ...(found as Record<string, string>) };
    }
  } catch {
    // No file yet.
  }
  ids[need] = id;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${file}.tmp`, JSON.stringify(ids), { mode: 0o600 });
  fs.renameSync(`${file}.tmp`, file);
}

const RESTORE_MS = 10000;

function credentialSetOf(key: string): string {
  const found = override(key);
  return found !== undefined && typeof found.value !== "string" && "credential" in found.value ? found.value.credential : "default";
}

type Restore = (restore: (configured: string) => Promise<void>, failure: unknown, key: string) => Promise<void>;

// The scenario module binds its password variable once and exports the result as `restorePassword`.
export function restorePasswordWith(passwordVariable: string): Restore {
  return (restore, failure, key) => restorePassword(restore, failure, key, passwordVariable);
}

async function restorePassword(restore: (configured: string) => Promise<void>, failure: unknown, key: string, passwordVariable: string): Promise<void> {
  let problem: string | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const info = testInfo();
    if (info.timeout > 0) {
      info.setTimeout(info.timeout + RESTORE_MS + 5000);
    }
    const configured = named(key, "password", credential(), passwordVariable);
    await Promise.race([
      restore(configured),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("timed out")), RESTORE_MS);
      }),
    ]);
  } catch {
    let set = "default";
    try {
      set = credentialSetOf(key);
    } catch {
      // the set stays "default": naming it beats failing to
    }
    problem = `The test changed the account's password but could not change it back. Reset the password of credential set "${set}" before running any test that signs in with it.`;
  } finally {
    clearTimeout(timer);
  }
  if (problem === undefined) {
    return;
  }
  if (failure === undefined) {
    throw new Error(problem);
  }
  if (failure instanceof Error) {
    failure.message = `${failure.message}\n\n${problem}`;
    throw failure;
  }
  throw new Error(`${String(failure)}\n\n${problem}`);
}
