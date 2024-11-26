describe("Main page view for a logged user", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.login();
    });

    it('should load a main page after successful login', () => {
        cy.url().should('contains', '/');               
    });

    it("should contain main page element", () => {
        cy.get("#main-layout-router-outlet-container").should("be.visible");
    });

    it("should contain main title", () => {
        cy.get("[data-test='home-page-main-title']").should("be.visible")
            .contains("Tablica główna pochwał");
    });

    it("should contain praise item", () => {
        cy.get("[data-test='praise-item']").should("be.visible");
    });


    it("praise item should contain praise card header", () => {
        cy.get("[data-test='praise-item-header']").each(($obj) => {
            cy.wrap($obj).within(() => {
                cy.get("[data-test='praise-competence']").should("be.visible");
                cy.get("[data-test='praise-created-at']").should("be.visible");
            });
        });          
    });

    it("praise item should contain praise card details", () => {
        cy.get("[data-test='praise-details']").each(($obj) => {
            cy.wrap($obj).within(() => {
                cy.get("[data-test='praise-images']").should("be.visible");
                cy.get("[data-test='praise-users']").should("be.visible");
            });
        });
    });

    it("praise item should contain praise card footer", () => {
        cy.get("[data-test='praise-footer']").each(($obj) => {
            cy.wrap($obj).within(() => {
                cy.get("[data-test='praise-project']").should("be.visible");
                cy.get("#praise-menu").should("be.visible");
            });
        });

    });

    it("check praise menu option", () => {
        cy.get("#praise-menu").click();
        cy.get("[data-test='praise-report']").should("have.text", " Zgłoś administratorowi ");
    });
});
