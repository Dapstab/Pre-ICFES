import crypto from "crypto";
import { Course } from "../axios/course";

export const courseModal = () => {
    const formContainer = document.querySelector('.modal');
    const courseForm = document.getElementById('form__course');
    const overlay = document.querySelector('.overlay');
/*     const addCourse = document.querySelector('.btn__btn--add-course');
    
    addCourse.addEventListener('click', () => {
        formContainer.classList.remove('hidden');
        overlay.classList.remove('hidden'); 
    }); */

    courseForm.addEventListener('submit', async e => {
        e.preventDefault();
        courseForm.classList.add('hidden');
        const code = crypto.randomBytes(10).toString('hex');
        let nombre = document.getElementById('name').value;
        const asignatura = document.getElementById('subject').value;
        // Creando el curso
        await Course.createCourse(nombre, asignatura, code);
    });
 

    overlay.addEventListener('click', () => {
        formContainer.classList.add('hidden');
        overlay.classList.toggle('hidden');
    });

}

