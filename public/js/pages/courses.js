import { Course } from "../axios/course";
export const Courses = () => {
    const courses = document.querySelector('.courses');
    courses.addEventListener('click', e => {
        e.stopImmediatePropagation();
        localStorage.setItem('currentCourse', e.target.dataset.courseid);
    });
    if (courses.dataset.role === 'estudiante') {
        const joinCourse = document.querySelector('.join-course');
        joinCourse.addEventListener('submit', async e => {
            e.preventDefault();
            const courseCode = document.getElementById('course-code').value;
            await Course.joinCourse(courseCode);
        });
    }
}