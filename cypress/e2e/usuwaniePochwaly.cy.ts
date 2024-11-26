describe("User Authentication", () => {
    it("should log in successfully", () => {
        cy.visit("/");

        cy.login({ login: "testhr", password: "testhr" });

    });
});