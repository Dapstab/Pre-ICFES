import axios from "axios";

export class Login {
  static login = async function (correo, clave) {
    try {
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:3000/api/v1/users/login",
        data: {
          correo,
          clave,
        },
      });
      if (res.data.status === "success") {
        window.setTimeout(() => {
          location.assign("/dashboard");
        }, 1500);
      }
    } catch (err) {
      console.log("Hubo un error");
    }
  };

  static logout = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://127.0.0.1:3000/api/v1/users/logout",
      });

      if (res.data.status === "success") {
        window.setTimeout(() => {
          location.assign("/");
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  static signup = async (
    nombre,
    apellido,
    correo,
    clave,
    confirmarClave,
    grado,
    jornada
  ) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:3000/api/v1/users/signup",
        data: {
          nombre,
          apellido,
          correo,
          clave,
          confirmarClave,
          grado,
          jornada,
        },
      });

      if (res.data.status === "success") {
        window.setTimeout(() => {
          location.assign("/");
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
