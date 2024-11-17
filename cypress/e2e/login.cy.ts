import LoginPage from "../pages/loginPage";

describe("User Authentication", () => {
  it("should log in successfully", () => {
    const loginPage = new LoginPage();
    cy.visit("/");

    loginPage.login('user8', 'user8pass');
    cy.url().should("eq", "https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/");
  });
});
