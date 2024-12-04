describe("Quit praise form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.clearPraisesIfNeeded();
    cy.visit("/");
  });

  it("should quit praise form and return to home page", () => {
    cy.get('.menu-item[aria-label="Pochwal"]').click();

    cy.dataTest("give-praise-delete-button").click();

    cy.dataTest("confirmation-delete-praise-dialog-header").parent().should("be.visible");

    cy.dataTest("confirmation-dialog-confirm-button").click();

    cy.location("pathname").should("eq", "/");
  });
});
