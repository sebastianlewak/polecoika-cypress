describe("Filling out the praise form", () => {
  beforeEach(() => {
    cy.fixture("testData").then((data) => {
      cy.visit("/");

      cy.login();

      cy.clearPraisesIfNeeded();

      cy.get("#receiver-select").click();
      cy.get('input[role="search"]').type(data.receiver);
      cy.get("span.select-option").click();

      cy.get("#project-select").click();
      cy.contains("span", data.project).click();

      cy.get("#competence-select").click();
      cy.contains("span", data.competence).click();

      cy.get("textarea").type(data.message);

      cy.intercept("POST", "/api/praise/create").as("submitForm");
      cy.get('button[type="submit"]').click();
    });
  });

  it("Should submit the praise form and return the correct response", () => {
    cy.get("@submitForm").its("response.statusCode").should("eq", 201);
  });

  it("Should show a success message after submission", () => {
    cy.get(".gds-snackbar__body__message")
      .should("be.visible")
      .and("contain", "Pochwała została wysłana.")
      .then(() => {
        cy.get(".gds-snackbar__body__message", { timeout: 5000 }).should("not.exist");
      });
  });

  it("Check if the newly submitted praise appears on the main board", () => {
    cy.wait("@submitForm").then((interception) => {
      cy.wrap(interception.response.body.id).as("createdPraiseId");
    });

    cy.intercept("POST", "/api/praise/find?page=0&size=10").as("getPraises");

    cy.visit("/");

    cy.wait("@getPraises").then((interception) => {
      const praiseIdList = interception.response.body.content;

      cy.get("@createdPraiseId").then((createdPraiseId) => {
        const praiseIdExists = praiseIdList.some((praise: any) => praise.id === createdPraiseId);
        expect(praiseIdExists).to.be.true;
      });
    });
  });
});
