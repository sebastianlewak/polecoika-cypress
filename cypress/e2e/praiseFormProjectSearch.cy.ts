describe("Praise form project search", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login({ login: "ewa.kaminska", password: "ewa2024" });
    cy.clearPraisesIfNeeded();
    cy.wait(2000);
    cy.get('.menu-item[aria-label="Pochwal"]').click();
  });

  it("should fill out the form with typed and clicked project name", () => {
    cy.get('[data-test="give-praise-project-select"]').click();
    cy.get('input[type="text"]#project-select').type("zuch");
    cy.get('[aria-label="ZUCH"]').click();
    cy.get("#project-select").should("have.value", "ZUCH");
  });

  it("should fill out the form with selected and clicked project name", () => {
    cy.get('[data-test="give-praise-project-select"]').click();
    cy.get('[aria-label="Archiwum BUSC"]').click();
    cy.get("#project-select").should("have.value", "Archiwum BUSC");
  });
});
