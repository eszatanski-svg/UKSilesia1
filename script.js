const przyciskMenu = document.querySelector("#przycisk-menu");
const menuRozwijane = document.querySelector("#menu-rozwijane");

function zamknijMenu() {
  menuRozwijane.hidden = true;
  przyciskMenu.setAttribute("aria-expanded", "false");
}

przyciskMenu.addEventListener("click", () => {
  const jestOtwarte = przyciskMenu.getAttribute("aria-expanded") === "true";

  menuRozwijane.hidden = jestOtwarte;
  przyciskMenu.setAttribute("aria-expanded", String(!jestOtwarte));
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
