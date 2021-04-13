import axios from "axios";
import addToArrayLS from "../utils/addToArrayLS";
export class Question {
  static questions = [];
  static async createQuestion(
    pregunta,
    opciones,
    respuesta,
    asignatura,
    temas,
    subtemas,
    dificultad
  ) {
    try {
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:3000/api/v1/pregunta",
        data: {
          pregunta,
          opciones,
          respuesta,
          asignatura,
          temas,
          subtemas,
          dificultad,
        },
      });
      if (res.data.status === "success") {
        const question = res.data.newDoc;
        const data = JSON.parse(localStorage.getItem('questions'));
        if (data) {
          data.push(question);
        }
        this.questions.push(question);
        localStorage.setItem('questions', JSON.stringify(data ? data : this.questions));
        window.setTimeout(() => {
          location.assign(`/quiz/edit`);
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
