describe("User Authentication", () => {
  it("should log in successfully", () => {
    cy.visit("/");

    cy.login({ login: "user8", password: "user8pass" });
  });
});
