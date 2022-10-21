import App from "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener(
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

  if (window.innerWidth > 400) App(700, 35, 35);
  else App(200, 20, 20);
});
