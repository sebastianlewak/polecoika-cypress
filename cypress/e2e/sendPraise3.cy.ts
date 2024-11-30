describe("Sending praise", () => {
    beforeEach(() => {

      cy.visit("/");

      cy.login({ login: "user8", password: "user8pass" });

    });
  
    it("Test of sending praise to another user", () => {
      
        cy.intercept('GET', '/api/praise/competences?size=1000').as('getCompetences');
        cy.intercept('GET', '/api/praise/projects?size=1000').as('getProjects');
        cy.intercept('GET', '/api/users?search=Kaczmarek%20Tomasz&size=1000').as('getUser');
        cy.clearPraisesIfNeeded();
        cy.wait('@getCompetences');
        cy.wait('@getProjects');
      
      cy.fixture('testData3').then((data) => {
        
        cy.get("#receiver-select").click();
        cy.get('input[role="search"]').should("be.visible").type(data.receiver);
        cy.wait('@getUser');
        cy.get("div[role='listbox']").should("be.visible");
        cy.contains("span", data.receiver).click();

        cy.get("#project-select").click();
        cy.get('input[role="search"]').should("be.visible").type(data.project);
        cy.get('div[role="listbox"]').should("be.visible");
        cy.contains("span", data.project).click();

        cy.get('#competence-select').click();
        cy.get('input[role="search"').should("be.visible").type(data.competence);
        cy.get('div[role="listbox"]').should("be.visible");
        cy.contains("span", data.competence).click();

        cy.get('gds-textarea[data-test="give-praise-comment-textarea"] textarea').type(data.comment);

        cy.get("#receiver-select").should("contain.value", data.receiver);
        cy.get("#project-select").should("have.value", data.project);
        cy.get("#competence-select").should("have.value", data.competence);

      })
        


        cy.intercept('POST', '/api/praise/create').as('sendPraise')
        cy.get("#submit-button").click();
        cy.wait('@sendPraise').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
            const praiseId = interception.response.body.id;
            Cypress.env('praiseId', praiseId);
        })
        cy.get("gds-snackbar div div div").should("contain.text", "Pochwała została wysłana. Wysłanych w tym miesiącu: ");
    });

    it("Check that the praise is on the main board", () => {
      cy.intercept('POST', '/api/praise/find?page=0&size=10').as('getPraises');
    
      const praiseId = Cypress.env('praiseId');
    
      cy.wait('@getPraises').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    
        const praises = interception.response.body.content;
        const foundPraise = praises.filter(praise => praise.id === praiseId);
    
        expect(foundPraise.length).to.eq(1); 
        expect(foundPraise[0].id).to.eq(praiseId);
      });
    });
});