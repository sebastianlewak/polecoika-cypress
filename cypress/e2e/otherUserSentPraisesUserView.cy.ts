describe("Other User Sent Praises User View", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.login({ login: "user7", password: "user7pass"});
        cy.get("[data-test='sent-recipient-name']").first().click();
        cy.intercept("/api/praise/find*").as("getSentPraises");
        cy.contains("button", " Wysłane ").click();
        cy.wait(["@getSentPraises"]);
    });

    it("should load user-profile page", () => {
        cy.url().should("includes", "/user-profile/");
    });

    it("should contain user profile praise list", () => {
        cy.get("[data-test='user-profile-praise-list']").should("be.visible");
    });

    it("should contain praise list title", () => {
        cy.get("[data-test='praise-title']").should("be.visible")
            .contains("Pochwały");
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

    it("sent praise item should contain header, details and footer", () => {
        cy.get("[data-test='sent-praise-item']").as("praise-item");
        cy.get("[data-test='praise-item-header']").should("be.visible");
        cy.get("@praise-item").each(($obj) => {
            cy.wrap($obj).within(() => {
                cy.get("[data-test='praise-item-header']").as("praise-item-header");                
                cy.get("[data-test='praise-details']").as("praise-item-details");                
                cy.get("[data-test='praise-footer']").as("praise-footer");
                cy.get("@praise-item-header").should("be.visible");
                cy.get("@praise-item-details").should("be.visible");
                cy.get("@praise-footer").should("be.visible");
            });
        });
    });   

    it("sent praise card header should contain competence and created date", () => {
        cy.get("[data-test='praise-item-header']").as("praise-item-header");
        cy.get("@praise-item-header").should("be.visible");
        cy.get("@praise-item-header").each(($obj) => {
            cy.wrap($obj).within(() => {
                cy.get("[data-test='praise-competence']").as("praise-competence");               
                cy.get("[data-test='praise-created-at']").as("praise-created-at");
                cy.get("@praise-competence").should("be.visible");
                cy.get("@praise-created-at").should("be.visible");
            });
        });          
    });

    it("sent praise card details should contain images and users", () => {
        cy.get("[data-test='praise-details']").as("praise-details");
        cy.get("@praise-details").should("be.visible");
        cy.get("@praise-details").each(($obj) => {
            cy.wrap($obj).within(() => {
                cy.get("[data-test='praise-users']").as("praise-users");
                cy.get("@praise-users").should("be.visible");
            });
        });
    });

    it("sent praise card footer should contain project and menu", () => {
        cy.get("[data-test='praise-footer']").as("praise-footer");
        cy.get("@praise-footer").should("be.visible");
        cy.get("@praise-footer").each(($obj) => {
            cy.wrap($obj).within(() => {
                cy.get("[data-test='praise-project']").as("praise-project");
                cy.get("#praise-menu").as("praise-menu");
                cy.get("@praise-project").should("be.visible");
                cy.get("@praise-menu").should("be.visible");
            });
        });
    });

    it("check sent praise menu option", () => {
        cy.get("#praise-menu").click();
        cy.get("[data-test='praise-report']").should("have.text", "Zgłoś administratorowi");
    });
    
});