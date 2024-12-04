describe("Received praises card", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("should redirect the user to their profile with received praises tab open", () => {
    cy.dataTest("card-header-received-link").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/my-profile");
      expect(loc.search).to.eq("?selectedTab=received");
    });

    cy.get("#praise-tabs #tab-1").should("be.visible");
  });

  it("should display the correct number of received praises", () => {
    cy.intercept("api/praise/statistics").as("getStatistics");

    cy.wait("@getStatistics").then((interception) => {
      const { totalCount } = interception.response.body.received;

      cy.dataTest("praise-number").first().contains(totalCount);
    });
  });

  it("should display the last praise sender details", () => {
    cy.intercept("api/praise/statistics").as("getStatistics");

    cy.wait("@getStatistics").then((interception) => {
      const { firstName, lastName, id, position } =
        interception.response.body.received.lastPraise.senderUser;

      cy.get('[data-test="received-sender-link"]').as("senderLink");

      cy.get("@senderLink").contains(`${firstName} ${lastName}`);

      cy.get("@senderLink").contains(`${firstName} ${lastName}`);

      cy.get("@senderLink").parent().contains(`${position}`);

      cy.get("@senderLink").click();
      cy.location("pathname").should("eq", `/user-profile/${id}`);
    });
  });
});
