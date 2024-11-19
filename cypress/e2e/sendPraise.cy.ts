import LoginPage from "../pages/loginPage";

describe("Filling out the praise form", () => {
  it("Filling out the praise form with correct data", () => {
    const loginPage = new LoginPage();
    cy.visit("https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/praise");

    loginPage.login("user8", "user8pass");

    cy.get("#receiver-select").click();
    cy.get('input[type="text"]').should("be.visible").type("ada");

    cy.get("span.select-option").click();

    cy.get("#project-select").click();
    cy.contains("span", "Ambasada Danych").click();

    cy.get("#competence-select").click();
    cy.contains("span", "Inicjatywa").click();

    cy.get("textarea").type("testtest");

    cy.intercept("POST", "/api/praise/create").as("submitForm");
    cy.get('button[type="submit"]').click();

    // cy.get(".gds-snackbar--success").should("be.visible").contains("Pochwała została wysłana");

    cy.wait("@submitForm").its("response.statusCode").should("eq", 201);
  });
});
