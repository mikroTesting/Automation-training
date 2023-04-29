import { test, expect } from "@playwright/test";

test.describe("User login funcionality", () => {

  const userPassword = "testtest";
  const userLogin = "tester12";

  test.beforeEach(async ({page}) => {
    const url = "https://demo-bank.vercel.app/";
    await page.goto(url);
    
  })


  test("001 Valid login with correct credentials", async ({ page }) => {
    // Arrange
    const expectedUsername = "Jan Demobankowy";

    // Act
    await page.getByTestId("login-input").fill(userLogin);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    // Assert
    await expect(page.getByTestId("user-name")).toBeVisible();
    await expect(page.getByTestId("user-name")).toHaveText(expectedUsername);
  });

  test("002 Invalid login with too short username", async ({ page }) => {

    // Arrange
    const invalidUserLogin = "admin";
    const errorUsernameMessage = "identyfikator ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(invalidUserLogin);
    await page.getByTestId("password-input").fill(userPassword);

    // Assert
    await expect(page.getByTestId("error-login-id")).toBeVisible();
    await expect(page.getByTestId("error-login-id")).toHaveText(errorUsernameMessage);
    await expect(page.getByTestId("login-button")).toBeDisabled();
  });

  test("003 Invalid login with too short password", async ({ page }) => {

    // Arrange
    const invalidUserPassword = "haslo";
    const errorPasswordMessage = "hasło ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(userLogin);
    await page.getByTestId("password-input").fill(invalidUserPassword);
    await page.getByTestId("password-input").blur(); // Usuwa focus z elementu

    // Assert
    await expect(page.getByTestId("error-login-password")).toBeVisible();
    await expect(page.getByTestId("error-login-password")).toHaveText(errorPasswordMessage);
    await expect(page.getByTestId("login-button")).toBeDisabled();
  });
});