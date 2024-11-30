const Black = "rgb(0, 0, 0)";
const Blue = "rgb(4, 82, 168)";
const White = "rgb(255, 255, 255)";
const Red = "rgb(185, 15, 41)";

describe("My profile page view", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.login();
        cy.get('a[aria-label="Mój profil"]').click();
        cy.url().should("contains", "/my-profile");
    });

    it("My profile header verification", () => {

        cy.get("img[data-test='user-profile-avatar']").should("be.visible");

        cy.get('h1[data-test="user-profile-full-name"]').should("be.visible").and("have.css", "font-weight", '700').and("have.css", "color", Black);

        cy.get('h2[data-test="user-profile-position"]').should("be.visible").and("have.css", "font-weight", '400').and("have.css", "color", Black);

        cy.get('h4[data-test="user-profile-department"]').should("be.visible").and("have.css", "font-weight", '400').and("have.css", "color", Black);

        cy.get('p[data-test="user-profile-email"]').should("be.visible").and("have.css", "font-weight", '700').and("have.css", "color", Blue);

    });

    it("My profile description verification", () => {

        cy.get("#user-profile-description-card").should("be.visible");

        cy.get('h3[data-test="description-title"]').should("be.visible").and("have.css", "font-weight", '700').and("have.css", "color", Black);

        cy.get('#description-button button').should("be.visible").and("have.css", "font-weight", '700').and("have.css", "color", Blue);

        cy.get('#description-button gds-icon').should("be.visible");

        cy.get('h3[data-test="description-title"]').first().should("have.text", "Opis");

        cy.get('h3[data-test="description-title"]').last().should("have.text", "Projekty");

    });

    it("My profile praise card verification", () => {

        cy.get("#my-profile-praise-card").should("be.visible");

        cy.get('#my-profile-praise-card h3').should("be.visible").and("have.css", "color", Black).and("have.css", "font-weight", '700').and("have.text", "Twoje pochwały");

        cy.get("#praise-send-button button").should("be.visible").and("contains.text", "Pochwal").and("have.css", "color", White).and("have.css", "font-weight", "700");

        cy.get("#tab-1").should("be.visible").and("contain.text", "Otrzymane").and("have.css", "color", Blue).and("have.css", "font-weight", "400");

        cy.get("#tab-2").should("be.visible").and("contain.text", "Wysłane").and("have.css", "color", Blue).and("have.css", "font-weight", "400");
    });

    it("My profile description editing test", () => {
        cy.get("#description-button button").click();
        cy.get("#description-textarea textarea").clear();
        cy.get("#description-dialog-save-button button").click();
        cy.get("#description-button button").should("contain.text", "Dodaj").click();
        cy.get("#description-dialog-header div div").should("be.visible").and("contain.text", "Dodaj opis").and("have.css", "font-weight", "700").and("have.css", "color", "rgb(16, 19, 23)");
        cy.get("#description-dialog-header gds-icon").should("be.visible");
        cy.get("#description-dialog-content").should("contain.text", "Uwielbiasz analizować zmieniające się regulacje prawne? A może Angular jest Twoją pasją? W wolnych chwilach chodzisz na maratony filmowe? Daj się poznać innym! Napisz krótki opis, żeby użytkownicy dowiedzieli się czegoś o Tobie :)");
        cy.get("#description-textarea label").should("contain.text", "Opis").and("contain.text", "(opcjonalnie)");
        cy.get("#description-textarea textarea").should("be.visible").type("Słońce powoli zachodziło za horyzontem, malując niebo ciepłymi odcieniami różu i pomarańczy. Lekki wiatr poruszał liście drzew, ptaki śpiewały swoje ostatnie pieśni tego dnia. Ludzie w parku spacerowali, ciesząc się chwilą spokoju. Zbliżała się noc.");
        cy.get("#description-dialog-save-button button").click();

        cy.get("#description-toggle-button button").should("not.exist");
        cy.get("#description-button button").should("contain.text", "Edytuj").click();
        cy.get("#description-dialog-header div div").should("contain.text", "Edytuj opis");
        cy.get("#description-textarea textarea").should("be.visible").clear().type("Tworzenie tekstu wymaga jasnego celu i planowania. Kluczowe pytania to: Jaki jest cel? Kto jest odbiorcą? Język umożliwia wymianę myśli i wiedzy, stanowiąc fundament komunikacji międzyludzkiej. Rozwój technologii oferuje korzyści, jak dostęp do informacji, ale rodzi też wyzwania, np. uzależnienia czy dezinformację. Ekologia zyskuje na znaczeniu w obliczu zmian klimatycznych i degradacji środowiska. Każdy może działać, ograniczając zużycie plastiku, oszczędzając energię czy segregując odpady. Kluczowe jest także dbanie o motywację i równowagę między życiem a pracą. Inspiracja, rozwój i świadome podejście do codziennych wyzwań pomagają budować odporność na stres. Spójność i interesujące treści decydują o jakości tekstu. Pozdrawiam wszystkich!");
        cy.get("#description-dialog-save-button button").click();

        
        cy.get("#description-toggle-button button").should("be.visible").and("contain.text", "Rozwiń").click().should("contain.text", "Zwiń").click().should("contain.text", "Rozwiń");

        cy.get("#description-button button").should("contain.text", "Edytuj").click();
        cy.get("#description-textarea textarea").should("be.visible").type("!");
        cy.get("#description-textarea gds-icon").should("be.visible");
        cy.get("#description-textarea gds-icon + div").should("be.visible").and("have.css", "color", Red);
        cy.get("#description-textarea gds-validation-error-message p").should("be.visible").and("contain.text", "Skróć tekst.").and("have.css", "color", "rgb(205, 50, 20)");
        cy.get("#description-dialog-cancel-button button").should("be.visible").click();

    });

    it.only("My profile projects editing test", () => {
        cy.get("#projects-button button").click();
        cy.get("#add-project-select gds-icon").first().should("be.visible").click();
        cy.get("#projects-dialog-save-button button").should("be.visible").click();
        cy.get("#projects-button button").should("contain.text", "Dodaj").click();
        cy.get("#add-project-select gds-icon").last().should("be.visible").click();
        cy.get('div[role="listbox"] gds-checkbox').each(($el, index) => {
            if (index < 5) {
                cy.wrap($el).click();
            }
        });
        cy.get("#add-project-select gds-icon").last().should("be.visible").click();
        cy.get("#projects-dialog-save-button button").should("be.visible").click();

        cy.get("#projects-button button").should("contain.text", "Edytuj").click();
        cy.get("#add-project-select gds-icon").last().should("be.visible").click();
        cy.get('div[role="listbox"] gds-checkbox').eq(5).click();
        cy.get("#add-project-select gds-icon").last().should("be.visible").click();
        cy.get("#projects-dialog-save-button button").should("be.visible").click();
        cy.get("#projects-toggle-button button").should("be.visible").and("contain.text", "Pokaż wszystkie").click().should("contain.text", "Zwiń pozostałe")
        cy.get("#user-profile-description-card gds-badge").filter(':visible').should("have.length", 6);
        cy.get("#projects-toggle-button button").click().should("contain.text", "Pokaż wszystkie");
        cy.get("#user-profile-description-card gds-badge").filter(':visible').should("have.length", 5);

    });
})