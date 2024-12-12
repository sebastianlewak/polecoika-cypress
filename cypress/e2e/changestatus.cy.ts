describe("Change status", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.login({ login: 'zelislaw.zyzynski', password: 'zyzynski2024' }); 
    });

    it("User should be able to toggle the status of their praise", () => {
        cy.intercept('GET', '/api/users/*').as('getUserProfile'); 
        cy.get('[aria-label="Mój profil"]').click(); 
        cy.wait('@getUserProfile', { timeout: 10000 }); 
        cy.url().should('include', '/my-profile');

        // Locate the status button and toggle it based on its current state
        cy.get('button.gds-button--tertiary.gds-button--round.gds-button--icon-only')
          .eq(3)  // Assuming the button is the 4th one, index might need adjustment
          .should('be.visible')  
          .click();  

        // Check current option and click to toggle
        cy.get('gds-menu-item').then(($menu) => {
            if ($menu.text().includes('Ustaw jako prywatną')) {
                cy.contains('Ustaw jako prywatną').click();
                cy.get('button[aria-label="Zmień na prywatną"]').click(); 
                cy.get('.gds-snackbar', { timeout: 20000 }) 
                  .should('be.visible') 
                  .and('include.text', 'Status pochwały został zmieniony na prywatny');
            } else if ($menu.text().includes('Ustaw jako publiczną')) {
                cy.contains('Ustaw jako publiczną').click();
                cy.get('button[aria-label="Zmień na publiczną"]').click(); 
                cy.get('.gds-snackbar', { timeout: 20000 }) 
                  .should('be.visible') 
                  .and('include.text', 'Status pochwały został zmieniony na publiczny');
            } else {
                throw new Error('Unexpected menu option for status change');
            }
        });
    });
}); 


