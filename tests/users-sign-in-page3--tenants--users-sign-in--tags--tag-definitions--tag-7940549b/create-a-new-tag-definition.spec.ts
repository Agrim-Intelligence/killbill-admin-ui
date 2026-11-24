import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TagsPage } from "../../pages/TagsPage.page";
import { TagDefinitionsPage } from "../../pages/TagDefinitionsPage.page";
import { TagDefinitionsNewPage } from "../../pages/TagDefinitionsNewPage.page";
import { usersSignInPage3TenantsUsersSignInTagsTagDefinitionsTag7940549bData } from "../../data/users-sign-in-page3--tenants--users-sign-in--tags--tag-definitions--tag-7940549b/create-a-new-tag-definition.data";

test("Create a new tag definition", { tag: ["@id:t_091b6ec1", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const usersSignInPage = new UsersSignInPage(page);
  const tagsPage = new TagsPage(page);
  const tagDefinitionsPage = new TagDefinitionsPage(page);
  const tagDefinitionsNewPage = new TagDefinitionsNewPage(page);
  await usersSignInPage3.signIn(usersSignInPage3TenantsUsersSignInTagsTagDefinitionsTag7940549bData.createANewTagDefinition.username, usersSignInPage3TenantsUsersSignInTagsTagDefinitionsTag7940549bData.createANewTagDefinition.password);
  await tenantsPage.continue();
  await usersSignInPage.tagsApplyOneOrMoreTags();
  await tagsPage.tagDefinitions();
  await tagDefinitionsPage.createDefinition();
  await tagDefinitionsNewPage.saveDefinition(usersSignInPage3TenantsUsersSignInTagsTagDefinitionsTag7940549bData.createANewTagDefinition.description, usersSignInPage3TenantsUsersSignInTagsTagDefinitionsTag7940549bData.createANewTagDefinition.name);
  await tagDefinitionsPage.expectLoaded(usersSignInPage3TenantsUsersSignInTagsTagDefinitionsTag7940549bData.createANewTagDefinition.name);
  // Then 1
  await expect(page).toHaveURL("/tag_definitions");
});
