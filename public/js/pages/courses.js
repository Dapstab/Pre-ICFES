
export const Courses = () => {
    const courses = document.querySelector('.courses');
    courses.addEventListener('click', e => {
        e.stopImmediatePropagation();
        localStorage.setItem('currentCourse', e.target.dataset.courseid);
    })
}