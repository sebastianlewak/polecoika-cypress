# Wymagania wstepne

## 1. Edytor kodu

Edytor kodu to program, który umożliwia przeglądanie i edytowanie plików projektu. Wybór edytora zależy od Was – jednymi z najpopularniejszych są Visual Studio Code oraz VIM.

Aby zainstalować edytor, wejdź na stronę producenta wybranego programu i postępuj zgodnie z instrukcjami instalacji.

## 2. Node.js

Node.js to środowisko uruchomieniowe JavaScript, które umożliwia korzystanie między innymi z komend potrzebnych do działania Cypressa.

- Wejdź na https://nodejs.org/en/download/prebuilt-installer.

- Wybierz zalecaną wersję.

- Po pobraniu uruchom instalator i klikaj „Dalej”, pozostawiając domyślne ustawienia.

Weryfikacja:

Po zakończeniu instalacji, aby upewnić się, że Node.js został poprawnie zainstalowany, otwórz wiersz poleceń (cmd/terminal) i wpisz:

```console
node -v
```

Powinieneś zobaczyć wersję Node.js, co potwierdzi poprawność instalacji.

## 3. Instalacja projektu

Przykład instalacji projektu pokaże na bazie Visual Studio Code.

Krok 1:

- Otwórz nowe okno Visual Studio Code.

Krok 2:

- Otwórz zakładkę zaznaczoną na poniższym zrzucie ekranu i kliknij pobieranie. Zostaniesz przeniesiony na stronę, na której postępuj zgodnie z instrukcjami.

<p align="center">
  <img src="https://github.com/sebastianlewak/polecoika-cypress/blob/main/docs/vsc3.png">
</p>

Krok 3:

- Wróć na stronę główną Visual Studio Code i kliknij opcję "Clone Git Repository".

<p align="center">
  <img src="https://github.com/sebastianlewak/polecoika-cypress/blob/main/docs/vsc1.jpg">
</p>

Krok 4:

- W okienku wyszukiwania VSC wklej link do repozytorium projektu:

```console
  https://github.com/sebastianlewak/polecoika-cypress.git
```

<p align="center">
  <img src="https://github.com/sebastianlewak/polecoika-cypress/blob/main/docs/vsc2.png">
</p>

Krok 5:

- Wybierz lokalizację na dysku, gdzie projekt ma być zapisany.

Krok 6:

- Otwórz terminal VSC i wpisz następującą komendę, aby zainstalować wszystkie potrzebne zależności:

```console
  npm install
```

## 4. Uruchomienie pierwszego testu.

W ramach sprawdzenia, czy wszystko działa tak, jak powinno, napisałem test na podstawie strony www.coi.gov.pl.
Test wyszukuje na stronie element HTML o tagu h1 i sprawdza, czy zawiera on odpowiedni tekst.

Krok 1:

- W terminalu wpisz komendę, która uruchomi Cypressa. Upewnij się, że znajdujesz się w odpowiednim folderze projektu.

```console
  npx cypress open
```

Krok 2:

- Wybieramy "E2E Testing"

<p align="center">
  <img src="https://github.com/sebastianlewak/polecoika-cypress/blob/main/docs/cypress0.png">
</p>

Krok 3:

- Pojawi się okno Cypressa. Wybierz przeglądarkę, na której mają zostać uruchomione testy.

 <p align="center">
  <img src="https://github.com/sebastianlewak/polecoika-cypress/blob/main/docs/cypress1.png">
</p>

Krok 4:

- Zostanie otwarte nowe okno przeglądarki, gdzie znajdziesz listę dostępnych testów. Kliknij test, który znajduje się na liście..

<p align="center">
  <img src="https://github.com/sebastianlewak/polecoika-cypress/blob/main/docs/cypress2.png">
</p>

Krok 5:

- Sprawdź wynik testu. Jeśli test zakończył się pomyślnie (powinien wyglądać jak poniżej).

<p align="center">
  <img src="https://github.com/sebastianlewak/polecoika-cypress/blob/main/docs/cypress3.png">
</p>

## Do nauki pisania testów, polecam oficjalną dokumentacje Cypressa: https://docs.cypress.io/app/get-started/why-cypress
