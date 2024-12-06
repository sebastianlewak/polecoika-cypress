// Test written by Mateusz Dąbrowski

describe("Sending praise correctly", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.login();

    cy.clearPraisesIfNeeded();
  });

  it("should send praise correctly", () => {
    let sentCount1: number;

    cy.visit("/");

    cy.get('div[data-test="card-content"] b')
      .invoke("text")
      .should("match", /^\d+$/)
      .then((praiseCount) => {
        sentCount1 = parseInt(praiseCount);
      });

    cy.visit("/praise");

    cy.wait(2000);

    cy.get("#receiver-select").click();
    cy.wait(1000);
    cy.get('input[id="receiver-select"]').eq(1).type("ada");
    cy.get(".select-option").first().click();

    cy.get("#project-select").click();

    cy.contains("span", "Archiwum BUSC").click();

    cy.get("#competence-select").click();
    cy.get(".select-option").first().click();

    cy.get("#comment-textarea textarea").type("Cypress test!");

    cy.get("#submit-button").click();

    cy.get("#send-praise-confirm-dialog-button").click();

    cy.get('a[aria-label="Tablica główna"]').click();

    cy.wait(2000);

    cy.get('div[data-test="card-content"] b')
      .invoke("text")
      .should("match", /^\d+$/)
      .then((praiseCount) => {
        const sentCount2 = parseInt(praiseCount);
        expect(sentCount1 + 1).to.eq(sentCount2);
      });
  });
});
