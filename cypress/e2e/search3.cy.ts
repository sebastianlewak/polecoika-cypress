describe("Search competence", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.login({ login: 'zelislaw.zyzynski', password: 'zyzynski2024' });
    });

    it("User should see a filtered list or empty list based on search input", () => {
        // Interceptowanie zapytania do API
        cy.intercept('GET', '/api/praise/competences?size=1000').as('getCompetences');
        cy.get('[aria-label="Pochwal"]').first().click();
        cy.wait('@getCompetences', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

        // Zapamiętanie liczby opcji przed filtrowaniem
        cy.get('.dropdown-options-container gds-select-option span.select-option',{timeout:10000})
            .then((elements) => {
                const initialCount = elements.length;

                // Filtrowanie listy
                cy.get('input[role="search"][placeholder="Wyszukaj..."]')
                    .type('Test');

                cy.get('.dropdown-options-container gds-select-option span.select-option')
                    .should('have.length.lessThan', initialCount);

                // Wpisanie tekstu, który nie ma wyników
                cy.get('input[role="search"][placeholder="Wyszukaj..."]')
                    .clear()
                    .type('Nieistniejąca fraza');

                cy.get('.dropdown-options-container gds-select-option')
                    .should('not.exist');

                cy.get('.dropdown-options-container')
                    .should('be.visible')
                    .and('not.have.descendants');
            });
    });
});
