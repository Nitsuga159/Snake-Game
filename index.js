import App from "./App.js";

const URL_DESKTOP = /\/snake-game\/[dD]esktop(\.html)?/;

const URL_MOBILE = /\/snake-game\/[mM]obile(\.html)?/;

const w = window;

let { pathname } = w.location;

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

  if (URL_DESKTOP.test(pathname)) App(700, 35, 35, "keydown");
  else if (URL_MOBILE.test(pathname)) App(200, 10, 10, "click");
});
