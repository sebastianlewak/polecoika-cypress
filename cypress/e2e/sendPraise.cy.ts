import LoginPage from "../pages/loginPage";

describe("Filling out the praise form", () => {
  it("Filling out the praise form with correct data", () => {
    const loginPage = new LoginPage();
    cy.visit("https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/praise");

    loginPage.login("user8", "user8pass");

    cy.get("#receiver").click();
    cy.get('input[type="text"]').should("be.visible").type("ada");

    cy.get("span.select-option").click();

    cy.get("input").eq(2).click();
    cy.contains("span", "Ambasada Danych").click();

    cy.get("input").eq(4).click();
    cy.contains("span", "Inicjatywa").click();

    cy.get("textarea").type("testtest");

    cy.get('button[type="submit"]').click();
  });
});
