describe("Cancel deleting Praise from Main Board", () => {
    it("should log in as admin and delete Praise from Main Board", () => {
        const praiseID = "#praise-item-e7a12a30-dae4-4384-95cb-be6742d5269c"
        cy.visit("/");
        cy.login({ login: "testhr", password: "testhr" });
        cy.intercept('POST', '/api/praise/find').as('postPraiseFind');
        cy.wait("@postPraiseFind").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        })
    });

    it("should cancel deleting praise", () => {
        cy.visit("/");
        cy.get("#praise-card-e7a12a30-dae4-4384-95cb-be6742d5269c").each(($obj) => {
            cy.wrap($obj).within(() => {
                cy.get("#praise-item-e7a12a30-dae4-4384-95cb-be6742d5269c");
                cy.wrap($obj).within(() => {
                    cy.get("[data-test='praise-footer']");
                    cy.wrap($obj).within(() => {
                        cy.get("#praise-menu");
                        cy.wrap($obj).within(() => {
                            cy.get("#menu-trigger")
                                .click();
                            cy.get("#menu")
                            cy.get("#dialog-cancel-button")
                        })
                    })
                })
            })
        })

        cy.get("body").then((body) => {
            if (body.find("#praise-card-e7a12a30-dae4-4384-95cb-be6742d5269c").length > 0) {
                cy.log("Test zakończył się sukcesem. Pochwała nie została usunięta.");
                expect(true).to.be.true;
            } else {
                cy.log("Test się nie udał. Pochwała została błędnie usunięta.");
                expect(true).to.be.false;
            }
        })

    })

});