import App from "./App.js";

const URL_DESKTOP = "/snake-game/Desktop.html";

const URL_MOBILE = "/snake-game/Mobile.html";

const w = window;

document.addEventListener("DOMContentLoaded", () => {
  w.addEventListener(
    "keydown",
    function (e) {
      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
          e.code
        ) > -1
      ) {
        e.preventDefault();
      }
    },
    false
  );

  if (w.location.pathname === URL_DESKTOP) App(700, 35, 35, "keydown");
  else if (w.location.pathname === URL_MOBILE) App(200, 10, 10, "click");
});
