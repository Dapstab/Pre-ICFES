import { Quiz } from "../axios/quiz"
const questions = document.querySelector('.questions');


export const solveQuiz = () => {
    let answers = [];
    const quizquestions = JSON.parse(questions.dataset.quizquestions);
    
    
    getAnswers();
    sendAnswers();
    
    function getAnswers() {
        questions.addEventListener('click', e => {
            const optionInput = e.target.closest('.option-input');
            if (!optionInput) return
            const optionsContainer = optionInput.parentNode.parentNode;
            const { indexq } = optionsContainer.dataset;
            const { indexo } = optionInput.dataset;
            answers[indexq] = Number(indexo);
            localStorage.setItem('answers', JSON.stringify(answers));
        });
    }
    
    function checkAnswers() {
        let correct = 0;
        this.quizquestions.forEach( pregunta, i => pregunta.respuesta === answers[i] ? correct++ : correct);
        return correct;
    }

    function sendAnswers() {  
        questions.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log(quizquestions); 
            let correct = 0;
            quizquestions.forEach( (pregunta, i) => pregunta.respuesta === answers[i] ? correct++ : correct);
            //localStorage.setItem('result', `${this.checkAnswers()} / ${this.quizquestions.length}`);
            const grade =  5 * correct / quizquestions.length;
            Quiz.updateGrade(grade);
            localStorage.setItem('result', `${correct} / ${quizquestions.length}`);
            /* window.setTimeout(() => {
                location.assign('/quiz/view');
              }, 1000); */

        })
    }

}/* 
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