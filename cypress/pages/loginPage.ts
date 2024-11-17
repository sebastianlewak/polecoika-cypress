class LoginPage {
  elements = {
    usernameInput: "#username",
    passwordInput: "#password",
    loginButton: "#kc-login",
  };

  enterUsername(username) {
    cy.get(this.elements.usernameInput).type(username);
  }

  enterPassword(password) {
    cy.get(this.elements.passwordInput).type(password);
  }

  submitLogin() {
    cy.get(this.elements.loginButton).click();
  }

  login(username = Cypress.env("USERNAME"), password = Cypress.env("PASSWORD")) {
    if (!username || !password) {
      throw new Error("Username or password is missing. Check environment variables or provide arguments.");
    }

    this.enterUsername(username);
    this.enterPassword(password);
    this.submitLogin();
  }
}

export default LoginPage;
