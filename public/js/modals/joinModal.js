import { Course } from "../axios/course";

export const join = () => {
    const joinBtn = document.querySelector('.join-btn');
    joinBtn.addEventListener('click', () => {
        Course.joinCourse(document.URL.split('/').pop());
    });
}
