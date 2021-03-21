import { Quiz } from "../axios/quiz";


export const createQuiz = function () {
  const quizForm = document.getElementById("form__quiz");
  quizForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const nombre = document.getElementById("name").value;
    const asignatura = document.getElementById("subject").value;
    const tiempo = document.getElementById("time").value;
    const fechaEntrega = document.getElementById("due-date").value;
    const descripcion = document.getElementById("description").value;
    const quizId = await Quiz.sendDataToQuiz(
      nombre,
      asignatura,
      tiempo,
      fechaEntrega,
      descripcion
    );
    window.localStorage.setItem("quiz", quizId);
    if (quizId){
        window.setTimeout(() => {
        location.assign("http://127.0.0.1:3000/quiz/question");
      }, 500);
    }
  });
};
