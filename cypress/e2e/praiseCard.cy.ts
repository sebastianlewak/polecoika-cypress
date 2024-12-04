describe("Praise card", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("should display the right content when praise limit is NOT reached", () => {
    cy.intercept("api/praiseCount", {
      praisesGiven: 5,
      limitReached: false,
    });

    cy.get("#praise-someone-card").should("be.visible").as("praiseCard");

    cy.get("@praiseCard").contains("Pochwal kogoś");

    cy.get("@praiseCard").contains(
      "Chcesz komuś podziękować za zaangażowanie w projekt? Ktoś jest dla Ciebie wzorem koleżeństwa? Wyślij pochwałę!",
    );

    cy.get("@praiseCard").find('[data-test="send-praise-button"]');

    cy.dataTest("send-praise-button").click();

    cy.location("pathname").should("eq", "/praise");
  });

  it("should display the right content when praise limit is reached", () => {
    cy.intercept("api/praiseCount", {
      praisesGiven: 10,
      limitReached: true,
    });

    cy.get("#praise-limit-reached-card").should("be.visible").as("praiseCard");

    cy.get("@praiseCard").contains("Wszystkie pochwały przyznane");

    cy.get("@praiseCard").contains(
      "Świetna robota! Kolejne pochwały możesz przyznawać od początku następnego miesiąca.",
    );

    cy.get("@praiseCard").find('[data-test="send-praise-button"]').should("not.exist");
  });
});
