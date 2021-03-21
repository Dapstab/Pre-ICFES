import axios from "axios";

export class Quiz {
  static sendDataToQuiz = async function (
    nombre,
    asignatura,
    tiempo,
    fechaEntrega,
    descripcion
  ) {
    try {
      const res = await axios({
        method: "POST",
        url: `http://127.0.0.1:3000/api/v1/quiz`,
        data: {
          nombre,
          asignatura,
          tiempo,
          fechaEntrega,
          descripcion,
        }
      });
      return res.data.newDoc._id;
    } catch (err) {
      console.log(err);
      console.log("Hubo un serio error gilipollas!!!");
    }
  };

  static endQuiz = async function (quizId) {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://127.0.0.1:3000/api/v1/quiz/edit/${quizId}`,
        data: JSON.parse(window.localStorage.getItem('questions'))
      });
      if (res.data.status === "success") {
        localStorage.removeItem('questions');
        localStorage.removeItem('quiz');
        window.setTimeout(() => {
          location.assign("http://127.0.0.1:3000/dashboard");
        }, 1500);
      }
    } 
    catch (err) {
      console.log("Hubo un error en el axios de endQuiz");
    }
  };
}
