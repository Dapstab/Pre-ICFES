import { Quiz } from "../axios/quiz";
import { Grades } from "../axios/grade";
// import { timer, timeSeconds } from "../utils/timer";
const questions = document.querySelector(".questions");
const stopWatch = document.querySelector(".timer");

export const solveQuiz = async () => {
  let answers = [];
  const quizId = document.URL.split("/").slice(-1)[0];
  const quizquestions = (await Quiz.getQuiz(quizId)).preguntas;
  getAnswers();
  sendAnswers();

  function getAnswers() {
    questions.addEventListener("click", (e) => {
      const optionInput = e.target.closest(".option-input");
      if (!optionInput) return;
      const optionsContainer = optionInput.parentNode.parentNode;
      const { indexq } = optionsContainer.dataset;
      const { indexo } = optionInput.dataset;
      answers[indexq] = Number(indexo);
      localStorage.setItem("answers", JSON.stringify(answers));
    });
  }

  function finishQuiz() {
    let correct = 0;
    quizquestions.forEach((pregunta, i) =>
      pregunta.respuesta === answers[i] ? correct++ : correct
    );
    //localStorage.setItem('result', `${this.checkAnswers()} / ${this.quizquestions.length}`);
    const grade = (5 * correct) / quizquestions.length;
    const slug = document.URL.split('/').slice(-1)[0];
    console.log(slug);
    await Grades.updateGrade(grade, slug, localStorage.getItem('currentCourse'));
  }

  function sendAnswers() {
    questions.addEventListener("submit", function (e) {
      e.preventDefault();
      finishQuiz();
    });
  }
};
/* 
export class SolveQuiz {
    static quizquestions = JSON.parse(questions.dataset.quizquestions);
    static getAnswers = function() {
        questions.addEventListener('click', e => {
            const optionInput = e.target.closest('.option-input');
            const optionsContainer = optionInput.parentNode.parentNode;
            const { indexq } = optionsContainer.dataset;
            if (!optionInput) return
            const { indexo } = optionInput.dataset;
            answers[indexq] = Number(indexo);
            console.log(this.quizquestions);
        });
        localStorage.setItem('answers', JSON.stringify(answers));
    }
    
    static checkAnswers = function() {
        let correct = 0;
        this.quizquestions.forEach( pregunta, i => pregunta.respuesta === answers[i] ? correct++ : correct);
        return correct;
    }

    static sendAnswers = function() {  
        questions.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log(questions)
            console.log(JSON.parse(questions.dataset.quizquestions))
            console.log(this.quizquestions); 
            let correct = 0;
            this.quizquestions.forEach( pregunta, i => pregunta.respuesta === answers[i] ? correct++ : correct);
            //localStorage.setItem('result', `${this.checkAnswers()} / ${this.quizquestions.length}`);
            localStorage.setItem('result', `${correct} / ${this.quizquestions.length}`);
             window.setTimeout(() => {
                location.assign('127.0.0.1:3000/quiz/view');
              }, 1000); 

        })
    }

    
} */
