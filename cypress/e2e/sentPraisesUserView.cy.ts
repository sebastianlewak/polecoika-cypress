describe("Own Sent Praises User View", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.login({ login: "user7", password: "user7pass"});
        cy.visit("/my-profile");
        cy.intercept("/api/praise/find*").as("getSentPraises");
        cy.contains("button", " Wysłane ").click();
        cy.wait(["@getSentPraises"]);
    });

    it("should load my-profile page", () => {
        cy.url().should("contains", "/my-profile");
    });

    it("should contain user profile praise list", () => {
        cy.get("[data-test='my-profile-praise-list']").should("be.visible");
    });

    it("should contain praise list title", () => {
        cy.get("[data-test='praise-title']").should("be.visible")
            .contains("Twoje pochwały");
    });

    it("should contain praise send button", () => {
        cy.get("[data-test='praise-send-button']").should("be.visible");
    })

    it("should contain praise tabs", () => {
        cy.get("[data-test='praise-tabs']").should("be.visible");
    });

    it("praise tabs should contain tablist", () => {
        cy.get("[data-test='praise-tabs']").within(() => {
            cy.contains("button", " Otrzymane ");
            cy.contains("button", " Wysłane ");
        });
    });

    it("should display tab for sent praises", () => {
        cy.get("#tabpanel-2").should("be.visible");
    })

    it("sent tab should display sent praise card", () => {
        cy.get("#tabpanel-2").should("be.visible");
        cy.get("[data-test='sent-praise-item']").should("be.visible");
    });
    
});