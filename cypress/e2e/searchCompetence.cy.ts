describe("Search competence", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.login({login: 'zelislaw.zyzynski', password: 'zyzynski2024'}); 
        cy.clearPraisesIfNeeded(); 
    });

    it("User should be able to select a competence", () => {
        cy.intercept('GET', '/api/praise/competences?size=1000').as('getCompetences'); // Intercept the API request for competences
        cy.get('[aria-label="Pochwal"]').first().click(); // Click the "Pochwal" button
        cy.wait('@getCompetences', { timeout: 10000 }).its('response.statusCode').should('eq', 200); // Wait for the competences API response and verify it's successful

        // Open the competence select dropdown
        cy.get('#competence-select').click();
        // Verify that there are 20 options
        cy.get('gds-select-option', { timeout: 10000 }).should('have.length', 20);
        // Search for "Empatia" 
        cy.get('input[role="search"]').should("be.visible").type("Empatia");
        // Verify that the listbox is visible
        cy.get('div[role="listbox"]').should("be.visible");
        // Verify that only 1 result matches the search
        cy.get('gds-select-option').should("have.length", 1);
        // Click the "Empatia" option
        cy.contains("span", "Empatia").click();
        // Verify that the input field shows the selected competence
        cy.get('#competence-select').should('contain.value', 'Empatia');
    });

    it("User should be able to change a selected competence", () => {
        cy.intercept('GET', '/api/praise/competences?size=1000').as('getCompetences');
        cy.get('[aria-label="Pochwal"]').first().click(); 
        cy.wait('@getCompetences', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

        // Select "Empatia"
        cy.get('#competence-select').click();
        cy.get('input[role="search"]').type("Empatia");
        cy.contains("span", "Empatia").click();
        cy.get('#competence-select').should('contain.value', 'Empatia');

        // Change selection to "Testowanie"
        cy.get('#competence-select').click();
        cy.get('input[role="search"]').type("Testowanie");
        cy.get('.dropdown-options-container gds-select-option span.select-option', { timeout: 10000 })
            .should('have.length.greaterThan', 0)
            .each(($el) => {
                expect($el.text()).to.include('Testowanie'); // Verify that each result contains "Testowanie"
            });
        cy.contains("span", "Testowanie").click();
        cy.get('#competence-select').should('contain.value', 'Testowanie');
    });

    it("User should see updated suggestions after clearing input", () => {
        cy.intercept('GET', '/api/praise/competences?size=1000').as('getCompetences');
        cy.get('[aria-label="Pochwal"]').first().click(); 
        cy.wait('@getCompetences', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
    
        // Open the competence select dropdown and type some letters
        cy.get('#competence-select').click();
        cy.get('input[role="search"]').should("be.visible").type("Emp");
        // Verify that suggestions are visible
        cy.get('div[role="listbox"]').should("be.visible");
        cy.get('gds-select-option').should("have.length.greaterThan", 0);
    
        // Clear the input
        cy.get('input[role="search"]').clear();
        // Verify that the suggestions list is updated
        cy.get('div[role="listbox"]').should("be.visible");
        cy.get('gds-select-option').should("have.length", 20); // Verify the full list is displayed again
        });

    it("User should be able to clear a selected competence", () => {
        cy.intercept('GET', '/api/praise/competences?size=1000').as('getCompetences');
        cy.get('[aria-label="Pochwal"]').first().click(); 
        cy.wait('@getCompetences', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

        // Select "Empatia"
        cy.get('#competence-select').click();
        cy.get('input[role="search"]').type("Empatia");
        cy.contains("span", "Empatia").click();
        cy.get('#competence-select').should('contain.value', 'Empatia');

        // Clear the selection
        cy.get('span.clear-icon', { timeout: 10000 }).should('exist').click(); // Click the clear icon to remove the selection

        // Verify that the input field is reset and the dropdown is closed
        cy.get('#competence-select')
            .should('have.attr', 'value', 'Wyszukaj') // The input field should show the placeholder "Wyszukaj"
            .and('have.attr', 'aria-expanded', 'false') // Ensure the dropdown is closed
            .and('be.visible'); // Ensure the field is visible
    });
});





