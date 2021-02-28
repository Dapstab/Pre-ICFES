import axios from "axios";

export class Course {
    static createCourse = async function(nombre, asignatura, code) {
        try {
            const res = await axios({
              method: "POST",
              url: `http://127.0.0.1:3000/api/v1/curso`,
              data: {
                nombre, 
                asignatura,
                code
              },
            });
          } catch (err) {
            console.log("Hubo un serio error gilipollas!!!");
          }
        };   

  static joinCourse = async function (code) {
    try {
      const res = await axios({
        method: "PATCH",
        url: `http://127.0.0.1:3000/api/v1/curso/${code}`,
        data: {
        },
      });
      return res.data.locals;
    } catch (err) {
      console.log("Hubo un serio error gilipollas!!!");
    }
  };
}
