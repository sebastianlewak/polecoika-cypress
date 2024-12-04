declare global {
  namespace Cypress {
    interface Chainable {
      enterUsername(username: string): Chainable;
      enterPassword(password: string): Chainable;
      submitLogin(): Chainable;
      login(user: string, username?: string, password?: string): Chainable;
      login(options?: { login?: string; password?: string; as?: string }): Chainable;
      clearPraisesIfNeeded(): Chainable;
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      dataTest(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

import "./commands";
