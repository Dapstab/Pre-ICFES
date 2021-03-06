import { Login } from "../axios/login";

const signupForm = document.querySelector(".formSignup");
const signupInputs = document.querySelectorAll(".formSignup__input");

export class SignupDOM {
  static animationInput = function () {
    if (signupInputs) {
      signupInputs.forEach((input) => {
        input.addEventListener("focus", function() {
          let parent = this.parentNode.parentNode;
          parent.classList.add("focus");
        });

        input.addEventListener("blur", function() {
          let parent = this.parentNode.parentNode;
          if (this.value === "") {
            parent.classList.remove("focus");
          }
        });
      });
    }
  };

  static signup = function () {
    if (signupForm) {
      signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("username").value;
        const apellido = document.getElementById("lastname").value;
        const correo = document.getElementById("email").value;
        const clave = document.getElementById("password").value;
        const confirmarClave = document.getElementById("passwordConfirm").value;
        const grado = document.getElementById("grade").value;
        const jornada = document.getElementById("jornada").value;
        Login.signup(
          nombre,
          apellido,
          correo,
          clave,
          confirmarClave,
          grado,
          jornada
        );
      });
    }
  };
}
