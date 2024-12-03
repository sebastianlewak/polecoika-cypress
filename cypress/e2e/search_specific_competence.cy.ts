describe("Search competence", () => {
    beforeEach(() =>{
      cy.visit("/");
      cy.login({login: 'zelislaw.zyzynski', password: 'zyzynski2024'});  
    });

    it("User should be able to search and select competence", () => {
        cy.get('[aria-label="Pochwal"]').first().click();
        cy.intercept('GET', '/api/praise/competences').as('api/praise/competences');
        cy.wait([
            '@api/praise/competences'
        ])
        cy.get('#competence-select').click();
        cy.contains("span", "Testowanie").click();
          
    });

})