describe("Sending praise", () => {
    beforeEach(() => {
      cy.visit("/");
  
      cy.login({ login: "user8", password: "user8pass" });
  
      cy.clearPraisesIfNeeded();
    });
  
    it("Test of sending praise to another user", () => {

        cy.get("#receiver-select").click();
        cy.get('input[role="search"]').should("be.visible").type("Tomasz Kaczmarek");
        cy.get("#681821ea-372f-457b-b1a6-f411d9b7b6d3").should("be.visible");
        cy.contains("span", "Kaczmarek Tomasz Architekt Systemowy").click();
        cy.get("#receiver-select").should("have.value", "Kaczmarek Tomasz Architekt Systemowy");
  
        cy.get("#project-select").click();
        cy.get('input[role="search"]').should("be.visible").type("Ekosystem e-usług 2.0");
        cy.get('div[role="listbox"]').should("be.visible");
        cy.contains("span", "Ekosystem e-usług 2.0").click();
        cy.get("#project-select").should("have.value", "Ekosystem e-usług 2.0");

        cy.get('#competence-select').click();
        cy.get('input[role="search"').should("be.visible").type("Zaangażowanie");
        cy.get('div[role="listbox"]').should("be.visible");
        cy.contains("span", "Zaangażowanie").click();
        cy.get("#competence-select").should("have.value", "Zaangażowanie");

        cy.get('gds-textarea[data-test="give-praise-comment-textarea"] textarea').type("cy.test.best");

        cy.intercept('POST', '/api/praise/create').as('sendPraise')
        cy.get("#submit-button").click();
        cy.wait('@sendPraise').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
        })
        cy.get("gds-snackbar div div div").should("contain.text", "Pochwała została wysłana. Wysłanych w tym miesiącu: ");
    })

  });