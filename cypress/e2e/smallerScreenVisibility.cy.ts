// Tests apply to screen resolutions under 768px

const sizes = [
  [767, 800],
  [600, 800],
  [450, 800],
  [380, 800],
];

describe("Component visibility on smaller screens", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  sizes.forEach((size) => {
    it(`should allow user to access side menu on ${size} screen`, () => {
      cy.viewport(size[0], size[1]);

      cy.get(".close-button.open-close-sidebar-button").should("be.visible").click();

      cy.get("[aria-label='Menu boczne - rozwiń']").should("be.visible").click();

      cy.get(".menu-item").should("have.length", 3);
    });

    it(`should hide user searchbar ${size} screen`, () => {
      cy.viewport(size[0], size[1]);

      cy.get(".search-bar-container").should("not.exist");
    });

    it(`should hide user logout panel ${size} screen`, () => {
      cy.viewport(size[0], size[1]);

      cy.get(".notification-user").should("not.exist");
    });
  });
});
