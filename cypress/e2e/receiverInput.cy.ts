describe("Receiver Input", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login({ login: "user7", password: "user7pass" });
    cy.visit("/praise");
  });

  it("should dipslay correct placeholder", () => {
    cy.get("#receiver-select").should("have.value", "Wyszukaj").and("be.visible");
  });

  it("should show an error message", () => {
    cy.fixture("testData").then((data) => {
      cy.wait(3000);
      cy.get("#project-select").should("be.visible").click();
      cy.contains("span", data.project).click();

      cy.get("#competence-select").click();
      cy.contains("span", data.competence).click();

      cy.get("textarea").type(data.message);
      cy.get('button[type="submit"]').click();

      cy.get("#receiver-select").should("have.css", "box-shadow", "rgb(205, 50, 20) 0px 0px 0px 1px inset");
      cy.get(".error-message")
        .should("be.visible")
        .and("contain", "Wybierz osobę z listy.")
        .and("have.css", "color", "rgb(205, 50, 20)");
    });
  });

  it("should allow typing in receiver select", () => {
    cy.get("#receiver-select").click();
    cy.get('input[type="text"]').type("Tomasz Kaczmarek").should("have.value", "Tomasz Kaczmarek");
  });

  it("should select the receiver from the list", () => {
    cy.get("#receiver-select").click();
    cy.get('input[type="text"]').type("Tomasz Kaczmarek");
    cy.get("span.select-option").click();
    cy.get(".error-message").should("not.exist");
  });

  it("should show options when typing a partial name in the receiver select field", () => {
    cy.get("#receiver-select").click();
    cy.get('input[type="text"]').type("Tom");
    cy.get(".select-option").should("be.visible");
  });
});
