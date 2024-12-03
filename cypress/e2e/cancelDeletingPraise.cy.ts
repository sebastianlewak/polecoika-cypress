describe("Cancel deleting Praise from Main Board", () => {
    it("should be possible to cancel deleting Praise from Main Board", () => {
        const praiseID = "#praise-card-f1d8dbfa-b52b-47d2-a660-5a6ab5553ba8"
        cy.visit("/");
        cy.login({ login: "testhr", password: "testhr" });
        cy.url().should("contains", "/");

        //should verify API response
        cy.intercept("POST", "'/api/praise/find*").as("postPraiseFind");
        cy.wait("@postPraiseFind").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        //should cancel deleting praise
        cy.get("#praise-card-f1d8dbfa-b52b-47d2-a660-5a6ab5553ba8").should("be.visible");
        cy.get("#praise-card-f1d8dbfa-b52b-47d2-a660-5a6ab5553ba8").find("#menu-trigger").click()
        cy.get("#menu").should("be.visible");
        cy.get("#menu").click();
        cy.get("#dialog-cancel-button").should("be.visible");
        cy.get("#dialog-cancel-button").click();

        //should verify that the praise was not deleted
        cy.intercept("DELETE", "/api/praise/*").as("deleteRequest");
        cy.wait(5000);
        cy.get("@deleteRequest.all").should("have.length", 0);
    });
});