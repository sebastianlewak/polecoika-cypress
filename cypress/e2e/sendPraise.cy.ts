
describe("Filling out the praise form", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.login();

    cy.clearPraisesIfNeeded();
  });

  it("Filling out the praise form with correct data", () => {
    cy.get("#receiver-select").click();
    cy.get('input[type="text"]').should("be.visible").type("ada");

    cy.get("span.select-option").click();

    cy.get("#project-select").click();
    cy.contains("span", "Ambasada Danych").click();

    cy.get("#competence-select").click();
    cy.contains("span", "Inicjatywa").click();

    cy.get("textarea").type("CypressTest");

    cy.intercept("POST", "/api/praise/create").as("submitForm");
    cy.get('button[type="submit"]').click();

    cy.wait("@submitForm").its("response.statusCode").should("eq", 201);
  });
});
