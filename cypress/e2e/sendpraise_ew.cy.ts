describe("Filling out the praise form", () => {
    beforeEach(() => {
      cy.visit("/");
  
      cy.login({login: 'zelislaw.zyzynski', password: 'zyzynski2024'});
      cy.clearPraisesIfNeeded();
  
    });
  
    it("Filling out the praise form with correct data", () => {
      cy.get('[aria-label="Pochwal"]').first().click();
      cy.get("#receiver-select").click();
      cy.get('input[role="search"]').should("be.visible").type("ich");
      cy.get("div[role='listbox']").should("be.visible");
      cy.get('span.select-option').contains('Kamiński Michał Frontend Developer').click();
  
      cy.get("#project-select").click();
      cy.get('input[role="search"]').should("be.visible").type("apl");
      cy.get("div[role='listbox']").should("be.visible");
      cy.contains('span.select-option', 'Aplikacja mObywatel 2.0').click();

  
      cy.get("#competence-select").click();
      cy.get('input[role="search"]').should("be.visible").type("pro");
      cy.get("div[role='listbox']").should("be.visible");
      cy.contains('span.select-option', "Programowanie").click();
  
      cy.get("textarea").type("Najlepszy programista na świecie! :)");

      cy.get("#receiver-select").should("have.value", "Kamiński Michał Frontend Developer");
      cy.get("#project-select").should("have.value", "Aplikacja mObywatel 2.0");
      cy.get("#competence-select").should("contain.value", "Programowanie");

      cy.intercept("POST", "/api/praise/create").as("submitForm");
      cy.get('button[type="submit"]').click();
  
      cy.get('[aria-label="Wyślij"]').should('be.visible').click();

      cy.wait("@submitForm").its("response.statusCode").should("eq", 201);
      cy.get("gds-snackbar div div div").should("contain.text", "Pochwała została wysłana. Wysłanych w tym miesiącu: ");
      cy.get('img[alt="send-praise"]') 
            .should('be.visible') 
            .and('have.attr', 'src').should('include', 'send-praise.svg'); 
    });
  });