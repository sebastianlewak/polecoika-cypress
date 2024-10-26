# Wymagania wstepne

1. Edytor kodu

Edytor kodu to program, który pozwala przeglądać i edytować pliki projektu.

Jaki wybierzecie to zależy od was, jedne z najpopularniejszych to Visual Studio Code lub VIM.

Do instalacji przejdz na stronę producenta i postępuj zgodnie z instrukcją.

2. Node.js

Node.js to środowisko wykonawcze JavaScript, które umożliwia uruchamianie komend potrzebnych do działania Cypressa.

- Wejdź na https://nodejs.org.

- Wybierz zalecaną wersję.

- Po pobraniu uruchom instalator i klikaj „Dalej”, zostawiając domyślne ustawienia.

Weryfikacja:

Po zakończeniu instalacji, aby upewnić się, że Node.js został poprawnie zainstalowany, otwórz wiersz poleceń (cmd/terminal) i wpisz:

node -v

Powinieneś zobaczyć wersję Node.js

3. Instalacja projektu

Pokażę to krok po kroku na podstawie Visual Studio Code.

Krok 1:

- Odpalaamy nowe okno VSC.

Krok 2:

- Klikamy w "Clone git repository"

<p align="center">
  <img src="https://github.com/sebastianlewak/polecoika-cypress/blob/main/docs/cypress0.png" alt="Opis zdjęcia" width="50%">
</p>

Krok 3:

- Pojawi sie okienka w wyszukiwarce VSC w które wklejamy link do naszego projektu:

```console
  git clone https://github.com/sebastianlewak/custom-form.git
```

![VSC1](C:\Users\sebas\Desktop\PoleCOIka Cypress\docs\vsc2.jpg)

Krok 4:

- Wybieramy miejsce w którym chcemy aby znajdował się nasz projekt lokalnie.

Krok 5:

- Odpalamy terminal i wpisujemy następujące komendy:

```console
  npm install
```

4. Odpalenie pierwszego testu.

W ramach sprawdzenia czy wszystko działa tak jak powinno napisałem test na podstawie strony www.coi.gov.pl.

Test wyszukuję na stronie element HTML o tagu h1, i sprawdza czy zawiera on odpowiedni tekst.

Krok 1:

- W terminalu wpisujemy komende, która odpali nam Cypressa. Upewnijcie się, że znajdujecie się w odpowiednim folderze.

```console
  npx cypress open
```

Krok 2:

- Wybieramy "E2E Testing"

![VSC1](C:\Users\sebas\Desktop\PoleCOIka Cypress\docs\cypress0.jpg)

Krok 3:

- Pojawi nam się okno Cypressa, wybieramy w nim przeglądarkę na zostaną odpalone nasze testy.

  ![VSC1](C:\Users\sebas\Desktop\PoleCOIka Cypress\docs\cypress1.jpg)

Krok 4:

- Zostanie odtworzone nowe okno przeglądarki, w którym widnieją wszystkie nasze testy. Klikamy znajdujący się w nim test

![VSC1](C:\Users\sebas\Desktop\PoleCOIka Cypress\docs\cypress2.jpg)

Krok 5:

- Sprawdzamy czy test przebiegł pomyślnie, jeżeli wygląda to tak jak poniżej możemy zacząć z pisaniem naszych własnych testów.

![VSC1](C:\Users\sebas\Desktop\PoleCOIka Cypress\docs\cypress3.jpg)
