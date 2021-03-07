import { Quiz } from "../axios/quiz";

const endQuizBtn = document.querySelector(".end-Quiz");
const addQuizQuestion = document.querySelector(".add-question");

export const editQuiz = function () {
  endQuizBtn.addEventListener("click", () => {
    const quizId = document.URL.split("/")[2];
    Quiz.endQuiz(quizId);
  });

  addQuizQuestion.addEventListener("click", () => {
    window.setTimeout(() => {
      location.assign("http://127.0.0.1:3000/questions/create");
    }, 1500);
  });
};
