import axios from "axios";

export class Quiz {
  static sendDataToQuiz = async function (
    nombre,
    asignatura,
    tiempo,
    fechaEntrega,
    descripcion,
    cursoId
  ) {
    try {
      const res = await axios({
        method: "POST",
        url: `http://127.0.0.1:3000/api/v1/courses/${cursoId}/quiz`,
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

  static endQuiz = async function (quizId, courseId) {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://127.0.0.1:3000/api/v1/courses/${courseId}/quiz/edit/${quizId}`,
        data: JSON.parse(localStorage.getItem('questions'))
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
  
  static getQuiz = async function(id) {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/quizzes/${id}`,
    })
    return res.data.doc;
  }
}
