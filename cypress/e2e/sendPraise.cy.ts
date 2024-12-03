

describe("Filling out the praise form", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.login();

    cy.clearPraisesIfNeeded();
  });

  it("Filling out the praise form with correct data", () => {
    cy.get("#receiver-select").click();
    cy.get('input[type="text"]').should("be.visible").type("ada")

describe("Filling out the praise form", () => {
  beforeEach(() => {
    cy.fixture("testData").then((data) => {
      cy.visit("/");

      cy.login();

      cy.clearPraisesIfNeeded();
 5083a2f44a9fcfa1f02f4bc5e09d028c70b6d175

      cy.get("#receiver-select").click();
      cy.get('input[type="text"]').type(data.receiver);
      cy.get("span.select-option").click();

      cy.get("#project-select").click();
      cy.contains("span", data.project).click();

      cy.get("#competence-select").click();
      cy.contains("span", data.competence).click();

    cy.get("textarea").type("CypressTest");

      cy.intercept("POST", "/api/praise/create").as("submitForm");
      cy.get('button[type="submit"]').click();
    });
  });

    cy.wait("@submitForm").its("response.statusCode").should("eq", 201);
  });
});
