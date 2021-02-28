import { Quiz } from "../axios/quiz";

export const createQuiz = () => {
    const quizForm = document.getElementById('form__quiz');
    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById('name').value;
        const asignatura = document.getElementById('subject').value;
        const tiempo = document.getElementById('duration').value;
        const fechaEntrega = document.getElementById('due-date').value;
        const descripcion = document.getElementById('description').value;
        console.log(nombre, asignatura, tiempo, fechaEntrega, descripcion);
        //Quiz.sendDataToQuiz(nombre, asignatura, duracion, fechaEntrega, descripcion);
    });
}
