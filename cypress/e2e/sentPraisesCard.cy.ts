describe("Sent praises card", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("should redirect the user to their profile with sent praises tab open", () => {
    cy.dataTest("card-header-sent-link").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/my-profile");
      expect(loc.search).to.eq("?selectedTab=sent");
    });

    cy.get("#praise-tabs #tab-2").should("be.visible");
  });

  it("should display the correct number of sent praises", () => {
    cy.intercept("api/praise/statistics").as("getStatistics");

    cy.wait("@getStatistics").then((interception) => {
      const { totalCount } = interception.response.body.sent;

      // Check if the correct number of sent praises is displayed in div
      cy.dataTest("praise-number").last().contains(totalCount);

      // Check if the correct number of sent praises is displayed in paragraph
      cy.get('[data-test="card-content"] > p > b').contains(totalCount);

      // Check if the icons indicate the correct number of sent praises
      if (totalCount > 0) {
        cy.get("#praise-counter-sent img:not(.brightness-0)").should("have.length", totalCount);
      } else {
        cy.get("#praise-counter-sent img.brightness-0").should("have.length", 10);
      }
    });
  });
});
