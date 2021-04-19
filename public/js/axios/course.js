import axios from "axios";

export class Course {
    static createCourse = async function(nombre, asignatura, code) {
        try {
            const res = await axios({
              method: "POST",
              url: `http://127.0.0.1:3000/api/v1/courses`,
              data: {
                nombre, 
                asignatura,
                code
              },
            });
            if (res.data.status === "success") {
              window.setTimeout(() => {
                location.assign("/courses");
              }, 1500);
            }
          } catch (err) {
            console.log("Hubo un serio error gilipollas!!!");
          }
        };   

  static joinCourse = async function (code) {
    try {
      const res = await axios({
        method: "PATCH",
        url: `http://127.0.0.1:3000/api/v1/courses`,
        data: {
          code
        },
      });   
      if (res.data.status === "success") {
        window.setTimeout(() => {
          location.assign(document.URL);
        }, 1500);
      }
    } catch (err) {
      console.log("Hubo un serio error gilipollas!!!");
    }
  };
}
