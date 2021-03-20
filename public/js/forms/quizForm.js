import { Quiz } from "../axios/quiz";

let quizId;

export const createQuiz = function () {
  const quizForm = document.getElementById("form__quiz");
  quizForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const nombre = document.getElementById("name").value;
    const asignatura = document.getElementById("subject").value;
    const tiempo = document.getElementById("time").value;
    const fechaEntrega = document.getElementById("due-date").value;
    const descripcion = document.getElementById("description").value;
    quizId = await Quiz.sendDataToQuiz(
      nombre,
      asignatura,
      tiempo,
      fechaEntrega,
      descripcion
    );
    const url = new URL("http://127.0.0.1:3000/quiz/question");
    url.searchParams.set("quiz", quizId);
    if (quizId) {
      window.setTimeout(() => {
        location.assign(url);
      }, 1500);
    }
  });
};
