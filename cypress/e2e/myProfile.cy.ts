describe("My profile page view", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.login();
        cy.get('a[aria-label="Mój profil"]').click();
    });

    it("Verification of correct display of own profile", () => {
        const Black = "rgb(0, 0, 0)";
        const Blue = "rgb(4, 82, 168)";
        const White = "rgb(255, 255, 255)";

        cy.url().should("contains", "/my-profile");

        // My profile headre verification

        cy.get("img[data-test='my-profile-avatar']").should("be.visible");

        cy.get('h1[data-test="my-profile-full-name"]').should("be.visible").and("have.css", "font-weight", '700').and("have.css", "color", Black);

        cy.get('h2[data-test="my-profile-position"]').should("be.visible").and("have.css", "font-weight", '400').and("have.css", "color", Black);

        cy.get('h4[data-test="my-profile-department"]').should("be.visible").and("have.css", "font-weight", '400').and("have.css", "color", Black);

        cy.get('p[data-test="my-profile-email"]').should("be.visible").and("have.css", "font-weight", '700').and("have.css", "color", Blue);

        // My profile description verification

        cy.get("#my-profile-description-card").should("be.visible");

        cy.get('h3[data-test="description-title"]').should("be.visible").and("have.css", "font-weight", '700').and("have.css", "color", Black);

        cy.get('#description-button button').should("be.visible").and("have.css", "font-weight", '700').and("have.css", "color", Blue);

        cy.get('#description-button gds-icon').should("be.visible");

        cy.get('h3[data-test="description-title"]').first().should("have.text", "Opis");

        cy.get('h3[data-test="description-title"]').last().should("have.text", "Projekty");

        // My profile praise card verification

        cy.get("#my-profile-praise-card").should("be.visible");

        cy.get('#my-profile-praise-card h3').should("be.visible").and("have.css", "color", Black).and("have.css", "font-weight", '700').and("have.text", "Twoje pochwały");

        cy.get("#praise-send-button button").should("be.visible").and("contains.text", "Pochwal").and("have.css", "color", White).and("have.css", "font-weight", "700");

        cy.get("#tab-1").should("be.visible").and("contain.text", "Otrzymane").and("have.css", "color", Blue).and("have.css", "font-weight", "400");

        cy.get("#tab-2").should("be.visible").and("contain.text", "Wysłane").and("have.css", "color", Blue).and("have.css", "font-weight", "400");
    })
})