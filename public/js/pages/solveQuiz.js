import { Quiz } from "../axios/quiz";
// import { timer, timeSeconds } from "../utils/timer";
const questions = document.querySelector(".questions");
const stopWatch = document.querySelector(".timer");

export const solveQuiz = () => {
  let answers = [];
  let timeSeconds = stopWatch.dataset.time * 60;
  const quizquestions = JSON.parse(questions.dataset.quizquestions);

  timer();
  getAnswers();
  sendAnswers();

  function timer() {
    if (stopWatch) {
      function updateCountdown() {
        let hours, minutes, seconds;
        if (timeSeconds >= 3600) {
          hours = Math.floor(timeSeconds / 3600);
          minutes = Math.floor((timeSeconds % 3600) / 60);
          seconds = Math.floor((timeSeconds % 3600) % 60);
        } else {
          minutes = Math.floor(timeSeconds / 60);
          seconds = timeSeconds % 60;
        }
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        stopWatch.textContent = hours
          ? `${hours}:${minutes}:${seconds}`
          : `${minutes}:${seconds}`;
        timeSeconds--;

        if (timeSeconds === 0) {
          stopWatch.textContent = "00:00:00";
          finishQuiz();
        }
      }
      if (timeSeconds > 0) {
          setInterval(updateCountdown, 1000);
        }
  }}
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
    Quiz.updateGrade(grade);
    localStorage.setItem("result", `${correct} / ${quizquestions.length}`);
    /* window.setTimeout(() => {
                    location.assign('/quiz/view');
                  }, 1000); */
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
