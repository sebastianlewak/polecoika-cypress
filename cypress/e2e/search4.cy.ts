describe("Search competence", () => {
    beforeEach(() =>{
      cy.visit("/");
      cy.login({login: 'zelislaw.zyzynski', password: 'zyzynski2024'});  
    });

    it("User should be able to search competence", () => {
        cy.get('[aria-label="Pochwal"]').first().click();
        cy.intercept('GET', '/api/praise/competences').as('getCompetences');
        cy.wait([
            '@getCompetences'
        ])
        cy.get('#competence-select').click();
          
    });

})