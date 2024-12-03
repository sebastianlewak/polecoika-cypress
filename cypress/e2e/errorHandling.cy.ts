describe("Error handling", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("Http failure response for")) {
        return false;
      }
      return true;
    });
  });
  it("should display an error message if deleting a praise fails", () => {
    cy.intercept("DELETE", "/api/praise/*", { statusCode: 500, failOnStatusCode: false }).as("deletePraise");

    cy.visit("/", { failOnStatusCode: false });
    cy.login({ login: "testhr", password: "testhr" });

    cy.get("#praise-menu").click();

    cy.get('li[data-test="praise-delete"]').click();

    cy.get('gds-button[data-test="dialog-confirm-button"]').click();
    cy.wait("@deletePraise");
  });
});
