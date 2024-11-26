describe("sending praise with only the competence field filled in", () => {
    beforeEach(() => {
        
      cy.visit("/");
  
      cy.login({ login: "user8", password: "user8pass" });
      cy.intercept('GET', '/api/praise/competences').as('getCompetences');
      cy.clearPraisesIfNeeded();
    });

    it("Filling in the competence field and checking the validation ", () => {
        const errorColor = "rgb(205, 50, 20)";
        const errorBorder = "rgb(205, 50, 20) 0px 0px 0px 1px inset"
        cy.url().should("include", "/praise");
        
        cy.wait('@getCompetences').then((interception) => {
          expect(interception.response.statusCode).to.eq(200);
        })

        // Choice of praise category

        cy.get("#competence-select").click();
        cy.get("input[role=search]").should("be.visible").type("Architektura");
        cy.get('div[role=listbox]').should("be.visible");
        cy.contains("span", "Architektura").should("be.visible").click();
        cy.get("#competence-select").should("have.value", "Architektura");

        cy.get("#submit-button").click();

        // Validation of the recipient's field
  
        cy.get("#receiver-select").should("have.css", "box-shadow", errorBorder);

        cy.get("gds-select[data-test='give-praise-receiver-select'] p").should("be.visible").and("have.text", "Wybierz osobę z listy.").and("have.css", "color", errorColor);

        // Validation of the project field

        cy.get("#project-select").should("have.css", "box-shadow", errorBorder);

        cy.get("gds-select[data-test='give-praise-project-select'] p").should("be.visible").and("have.text", "Wybierz projekt z listy.").and("have.css", "color", errorColor);

        // Validation of the praise content field

        cy.get("#comment-textarea div div").should("have.css", "box-shadow", "rgba(213, 35, 63, 0.35) 0px 0px 10px 0px").and("have.css", "border-color", "rgb(185, 15, 41)");

        cy.get("gds-textarea[data-test='give-praise-comment-textarea'] p").should("be.visible").and("have.text", "Uzupełnij opis.").and("have.css", "color", errorColor);

        cy.get("#comment-textarea gds-icon").should("be.visible");

        cy.get("#comment-textarea div div div").should("have.css", "color", "rgb(185, 15, 41)");
    });
});