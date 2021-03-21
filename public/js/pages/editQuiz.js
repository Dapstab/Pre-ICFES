import { Quiz } from "../axios/quiz";

const endQuizBtn = document.querySelector(".end-Quiz");
const addQuizQuestion = document.querySelector(".add-question");

export const editQuiz = function () {
  endQuizBtn.addEventListener("click", () => {
    Quiz.endQuiz(window.localStorage.getItem('quiz'));
  });

  addQuizQuestion.addEventListener("click", () => {
    window.setTimeout(() => {
      location.assign("http://127.0.0.1:3000/quiz/question");
    }, 1500);
  });
};
