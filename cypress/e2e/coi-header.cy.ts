describe("header", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1600, 1200);
  });

  it("the hi contains the correct text", () => {
    cy.get("h1").contains("Ludzie. Innowacje. Technologie.");
  });
});
