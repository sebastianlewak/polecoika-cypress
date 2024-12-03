describe("Log out", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.login();
    });
  
    it("User should log out successfully", () => {
      cy.get('[aria-controls="user-submenu"]', { timeout: 10000 }) // Get the user menu button
      .should('be.visible') // Ensure the user menu is visible
      .click({ force: true }); // Click the user menu, forcing the action if necessary

      cy.get('.menu-item-wrapper.logout')  // Get the log out menu item
      .should('be.visible') // Ensure it is visible
      .contains('Wyloguj') // Verify the text contains 'Wyloguj' (log out)
      .click(); // Click the log out option

      // After clicking log out, check if the login fields are visible
      cy.get('input#username') // Get the username input field
      .should('have.attr', 'name', 'username'); // Ensure it has the attribute 'name' with value 'username'

      cy.get('input#password') // Get the password input field
      .should('have.attr','name','password'); // Ensure it has the attribute 'name' with value 'password'

      // Finally, check if the user is redirected to the login page URL
      cy.url().should("include", "auth/realms/nmwit/protocol/openid-connect/auth"); // Verify the URL includes the login endpoint
      

    });
  });

