describe("Filling out the praise form", () => {
  it("Filling out the praise form with correct data", () => {

    cy.visit("https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/praise");
    cy.login({login: 'user7', password: 'user7pass'});

    // wybierz odbiorcę
    cy.get("#receiver").click();

    // wpisz "ada" w pole wyszukiwania
    cy.get('input[type="text"]').should("be.visible").type("ada");

    // wybierz pierwszą opcję z listy
    cy.get("gds-select-option").first().click();

    // wybierz projekt
    cy.contains("label", "Projekt").parent().find("input.main-select").click();

    // wybierz pierwszą opcję z listy
    cy.get("gds-select-option").first().click();

    // wybierz kompetencję
    cy.get("#competence").click();

    // wybierz pierwszą opcję z listy
    cy.get("gds-select-option").first().click();

    // wpisz treść pochwały
    cy.get(".gds-textarea-field").type("Dobra robota!");

    // kliknij przycisk "Wyślij"
    cy.get('button[type="submit"]').click();

    // sprawdź, czy pochwała została wysłana
    cy.wait(1000);
    cy.get(".gds-snackbar--success").should("be.visible").contains("Pochwała została wysłana");
  });
});


