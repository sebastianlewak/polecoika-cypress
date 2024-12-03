describe("User Authentication", () => {
  it("should log in successfully", () => {
    cy.visit("/");

    loginPage.login('user8', 'user8pass');
    cy.url().should("eq", "https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/");
  });
});
