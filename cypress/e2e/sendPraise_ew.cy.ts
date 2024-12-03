describe("Filling out the praise form", () => {
    beforeEach(() => {
      cy.visit("/");
  
      cy.login({login: 'zelislaw.zyzynski', password: 'zyzynski2024'});
  
    });
  
    it("Filling out the praise form with correct data", () => {
      cy.get('[aria-label="Pochwal"]').first().click();
      cy.get("#receiver-select").click();
      cy.get('input[type="text"]').should("be.visible").type("ich");
  
      cy.get('span.select-option').contains('Kamiński Michał Frontend Developer').click();
  
      cy.get("#project-select").click();
      cy.contains('span.select-option', 'Aplikacja mObywatel 2.0').click();

  
      cy.get("#competence-select").click();
      cy.contains('span.select-option', "Programowanie").click();
  
      cy.get("textarea").type("Najlepszy programista na świecie! :)");

      cy.intercept("POST", "/api/praise/create").as("submitForm");
      cy.get('button[type="submit"]').click();
  
      cy.wait("@submitForm").its("response.statusCode").should("eq", 201);
    });
  });
  