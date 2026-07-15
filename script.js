const przyciskMenu = document.querySelector("#przycisk-menu");
const menuRozwijane = document.querySelector("#menu-rozwijane");

function zamknijMenu() {
  menuRozwijane.hidden = true;
  przyciskMenu.setAttribute("aria-expanded", "false");
  przyciskMenu.classList.remove("menu-otwarte");
}

przyciskMenu.addEventListener("click", () => {
  const jestOtwarte = przyciskMenu.getAttribute("aria-expanded") === "true";

  menuRozwijane.hidden = jestOtwarte;
  przyciskMenu.setAttribute("aria-expanded", String(!jestOtwarte));
  przyciskMenu.classList.toggle("menu-otwarte", !jestOtwarte);
});

menuRozwijane.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    zamknijMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".obszar-menu")) {
    zamknijMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    zamknijMenu();
  }
});

const naglowek = document.querySelector(".naglowek-strony");

function ustawCienNaglowka() {
  naglowek.classList.toggle("naglowek-przewiniety", window.scrollY > 20);
}

ustawCienNaglowka();
window.addEventListener("scroll", ustawCienNaglowka, { passive: true });

const galeria = document.querySelector(".galeria-zdjec");

if (galeria) {
  const slajdy = galeria.querySelectorAll(".slajd-galerii");
  const kropki = galeria.querySelectorAll(".kropka-galerii");
  const poprzedni = galeria.querySelector(".poprzedni-slajd");
  const nastepny = galeria.querySelector(".nastepny-slajd");
  let aktualnySlajd = 0;
  let przewijanie = null;

  function pokazSlajd(numerSlajdu) {
    aktualnySlajd = (numerSlajdu + slajdy.length) % slajdy.length;

    slajdy.forEach((slajd, indeks) => {
      slajd.classList.toggle("aktywny-slajd", indeks === aktualnySlajd);
    });

    kropki.forEach((kropka, indeks) => {
      kropka.classList.toggle("aktywna-kropka", indeks === aktualnySlajd);
    });
  }

  function uruchomPrzewijanie() {
    window.clearInterval(przewijanie);
    przewijanie = window.setInterval(() => {
      pokazSlajd(aktualnySlajd + 1);
    }, 4500);
  }

  poprzedni.addEventListener("click", () => {
    pokazSlajd(aktualnySlajd - 1);
    uruchomPrzewijanie();
  });

  nastepny.addEventListener("click", () => {
    pokazSlajd(aktualnySlajd + 1);
    uruchomPrzewijanie();
  });

  kropki.forEach((kropka, indeks) => {
    kropka.addEventListener("click", () => {
      pokazSlajd(indeks);
      uruchomPrzewijanie();
    });
  });

  uruchomPrzewijanie();
}
