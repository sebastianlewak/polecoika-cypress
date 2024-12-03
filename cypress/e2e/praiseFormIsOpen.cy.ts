describe("Praise form is open", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login({ login: "aleksandra.kwiatkowska", password: "aleksandra2024" });
    cy.clearPraisesIfNeeded();
    cy.visit("/");
  });

  it("should open praise form from side menu", () => {
    cy.get('.menu-item[aria-label="Pochwal"]').click();
    cy.get("#comment-textarea").should("be.visible");
  });

  it("should open praise form from main board", () => {
    cy.get("#send-praise-button").click();
    cy.get("#comment-textarea").should("be.visible");
  });

  it("should open praise form from users own profile", () => {
    cy.get('.menu-item[aria-label="Mój profil"]').click();
    cy.get("#praise-send-button").click();
    cy.get("#comment-textarea").should("be.visible");
  });

  it("should open praise form from other users profile", () => {
    cy.visit(
      "https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/user-profile/77369fca-7db5-4c60-9dc7-788cb0da4992"
    );

    cy.get("#praise-send-button").click();
    cy.get("#comment-textarea").should("be.visible");
  });
});
