import axios from "axios";

export class Question {
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
        const params = new URLSearchParams(document.location.search); 
        window.setTimeout(() => {
          location.assign(`/quiz/edit/${params.get('quiz')}`);
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
