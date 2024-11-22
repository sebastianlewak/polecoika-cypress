Cypress.Commands.add("enterUsername", (username: string) => {
  cy.get("#username").type(username);
});

Cypress.Commands.add("enterPassword", (password: string) => {
  cy.get("#password").type(password);
});

Cypress.Commands.add("submitLogin", () => {
  cy.get("#kc-login").click();
});

Cypress.Commands.add("submitLogin", () => {
  cy.get("#kc-login").click();
});

Cypress.Commands.add("submitLogin", () => {
  cy.get("#kc-login").click();
});

//sign in

Cypress.Commands.add("login", (options: { login?: string; password?: string; as?: string } = {}) => {
  const defaultUsername = Cypress.env("USERNAME");
  const defaultPassword = Cypress.env("PASSWORD");

  const { login, password, as } = options;

  const username = login || defaultUsername;
  const userPassword = password || defaultPassword;

  if (!username || !userPassword) {
    throw new Error("Username or password is missing. Check environment variables or provide arguments.");
  }

  cy.enterUsername(username);
  cy.enterPassword(userPassword);

  if (as) {
    cy.intercept("POST", "/auth/realms/nmwit/protocol/openid-connect/token").as(as);
  }

  cy.submitLogin();
});

// praise manager

Cypress.Commands.add("clearPraisesIfNeeded", () => {
  cy.get('div[data-test="card-content"] b')
    .invoke("text")
    .should("match", /^\d+$/)
    .then((praiseCount) => {
      if (parseInt(praiseCount) >= 10) {
        cy.contains("Profil pracowniczy").click();
        cy.contains("Wyloguj").click();

        cy.login({ as: "getAdminToken", login: "testhr", password: "testhr" });

        cy.wait("@getAdminToken").then((interception) => {
          const { access_token } = interception.response.body;

          cy.request({
            method: "POST",
            url: "/api/praise/find",
            qs: {
              page: 0,
              size: 1000000,
            },
            body: {},
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            const praises = response.body.content;

            praises.forEach((praise) => {
              if (praise.senderUser.id === Cypress.env("SENDER_USER_ID")) {
                cy.request({
                  method: "DELETE",
                  url: `/api/praise/${praise.id}`,
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                  },
                }).then((deleteResponse) => {
                  expect(deleteResponse.status).to.eq(204);
                });
              }
            });

            cy.contains("Profil pracowniczy").click();
            cy.contains("Wyloguj").click();

            cy.login({ login: "user8", password: "user8pass" });
          });
        });
      }
    });
  cy.visit("/praise");
});
