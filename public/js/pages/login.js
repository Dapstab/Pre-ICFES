import { Login } from "../axios/login";

// Elementos HTML
const loginForm = document.querySelector(".formLogin");
const loginInputs = document.querySelectorAll(".formLogin__input");
const logoutBtn = document.querySelector(".sidebar__menu--logout");
export class LoginDOM {
  static animationInput = function () {
    if (loginInputs) {
      loginInputs.forEach((input) => {
        input.addEventListener("focus", function () {
          let parent = this.parentNode.parentNode;
          parent.classList.add("focus");
        });

        input.addEventListener("blur", function () {
          let parent = this.parentNode.parentNode;
          if (this.value === "") {
            parent.classList.remove("focus");
          }
        });
      });
    }
  };

  static login = function () {
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const correo = document.getElementById("email").value;
        const clave = document.getElementById("password").value;
        Login.login(correo, clave);
      });
    }
  };

  static logout = function () {
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        Login.logout();
      });
    }
  };
}
