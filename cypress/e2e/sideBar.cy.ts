describe("Sidebar Navigation", () => {
  beforeEach(() => {
      cy.visit("/");
      cy.login({ login: "user8", password: "user8pass" });
  });

  it("should validate the sidebar visibility and navigation", () => {
      cy.get("[data-test='main-layout-sidenav-wrapper']")
          .should("be.visible")
          .and("have.attr", "class")
          .and("include", "sidenav-wrapper");
      cy.get(".open-close-sidebar-button")
          .as("sidebarToggle")
          .should("have.attr", "aria-expanded", "true");

      cy.get("@sidebarToggle").click();
      cy.get("@sidebarToggle").should("have.attr", "aria-expanded", "false");

      cy.get("@sidebarToggle").click();
      cy.get("@sidebarToggle").should("have.attr", "aria-expanded", "true");
      cy.log("📜 Checking sidebar menu items");
      const menuItems = [
          { label: "Tablica główna", href: "/" },
          { label: "Pochwal", href: "/praise" },
          { label: "Mój profil", href: "/my-profile" },
      ];

      menuItems.forEach((item) => {
          cy.contains("a", item.label)
              .should("be.visible")
              .and("have.attr", "href", item.href)
              .click();
          cy.url().should("include", item.href);
          if (item.href !== "/") cy.visit("/");
      });


      cy.contains("a", "Tablica główna")
          .should("be.visible")
          .and(($el) => {
              const classValue = $el.attr("class") || "";
              const ariaCurrent = $el.attr("aria-current");
              expect(classValue.includes("selected") || ariaCurrent === "page").to.be.true;
          });
  });
});