describe("Search competence", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.login({login: 'zelislaw.zyzynski', password: 'zyzynski2024'});  
    });

    it("User should be able to search, select, and clear competence", () => {
        cy.intercept('GET', '/api/praise/competences?size=1000').as('getCompetences');// Intercept the API request for competences
        cy.get('[aria-label="Pochwal"]').first().click();// Click the "Pochwal" button
        cy.wait('@getCompetences', { timeout: 10000 }).its('response.statusCode').should('eq', 200);// Wait for the competences API response and verify it's successful
        
        
        cy.get('#competence-select').click();
        cy.get('input[role="search"][placeholder="Wyszukaj..."]',{ timeout: 10000 }).should('be.visible').type('Testowanie');

        // Check if the listbox containing search results is visible
        cy.get('div[role="listbox"]', { timeout: 10000 }).should('be.visible');

        // Check if the search results are correctly updated with "Testowanie"
        cy.get('.dropdown-options-container gds-select-option span.select-option', { timeout: 10000 })
            .should('have.length.greaterThan', 0) // Ensure there are more than 0 results
            .each(($el) => {
                expect($el.text()).to.include('Testowanie');// Verify that each result contains "Testowanie"
             });

        // Click on the "Testowanie" option from the list
        cy.contains("span", "Testowanie").click();

        // Verify that the input field shows the selected competence
        cy.get('#competence-select').should('contain.value', 'Testowanie');

        cy.get('span.clear-icon', { timeout: 10000 }).should('exist').click();// Click the clear icon to remove the selection

        // Verify that the input field is reset and the dropdown is closed
        cy.get('#competence-select')
            .should('have.attr', 'value', 'Wyszukaj') // The input field should show the placeholder "Wyszukaj"
            .and('have.attr', 'aria-expanded', 'false') // Ensure the dropdown is closed
            .and('be.visible'); // Ensure the field is visible
       


    });
});
