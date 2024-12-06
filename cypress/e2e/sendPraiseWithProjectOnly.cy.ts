// Test written by Mateusz Dąbrowski

describe("Filling out the praise form with project only", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.login();

    cy.clearPraisesIfNeeded();
  });

  it("should fail to send the praise with chosen project only", () => {
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

    cy.get("#project-select").click();

    cy.contains("span", "Archiwum BUSC").click();

    cy.get('button[type="submit"]').click();

    cy.get('a[aria-label="Tablica główna"]').click();

    cy.wait(2000);

    cy.get('div[data-test="card-content"] b')
      .invoke("text")
      .should("match", /^\d+$/)
      .then((praiseCount) => {
        const sentCount2 = parseInt(praiseCount);
        expect(sentCount1).to.eq(sentCount2);
      });
  });
});
