describe("Filling out the praise form only with recipient", () => {
  beforeEach(() => {
    cy.fixture("testData").then((data) => {
      cy.visit("/praise");
      cy.login();

      cy.get("#receiver-select").click();
      cy.get('input[type="text"]').type(data.receiver);
      cy.get("span.select-option").click();
      cy.get('button[type="submit"]').click();
    });
  });

  it.only("Validates project field", () => {
    cy.get("#project-select").should("have.css", "box-shadow", "rgb(205, 50, 20) 0px 0px 0px 1px inset");
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "Wybierz projekt z listy.")
      .and("have.css", "color", "rgb(205, 50, 20)");
  });

  it("Validates praise competence field", () => {
    cy.get("#competence-select").should("have.css", "box-shadow", "rgb(205, 50, 20) 0px 0px 0px 1px inset");
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "Wybierz kategorię pochwały z listy.")
      .and("have.css", "color", "rgb(205, 50, 20)");
  });

  it("Validates praise content field", () => {
    cy.get("textarea").parent().should("have.css", "border-color", "rgb(185, 15, 41)");
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "Uzupełnij opis.")
      .and("have.css", "color", "rgb(205, 50, 20)");
  });
});
