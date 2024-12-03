
describe("User Authentication", () => {
  it("should log in successfully", () => {

    cy.visit("/");

    cy.login({login: 'user7', password: 'user7pass'});
  });
});
