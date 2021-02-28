import "@babel/polyfill";
import { LoginDOM } from "./pages/login";
import { SignupDOM } from "./pages/signup";
import { QuestionForm } from "./forms/questionForm";
import { createQuiz } from "./forms/quizForm";
import { courseModal } from "./modals/courseModal";
import { join } from "./modals/joinModal";
// HomePage
LoginDOM.login();
LoginDOM.animationInput();

// Sign-up page
SignupDOM.signup();
// Question Form

if (document.URL === 'http://127.0.0.1:3000/questions/create') {
    QuestionForm.showPage();
    QuestionForm.removeData();
    QuestionForm.showTopics();
    QuestionForm.showSubTopics();
}

if (document.URL === 'http://127.0.0.1:3000/quiz') {
    createQuiz();
}


if (document.URL === 'http://127.0.0.1:3000/tablero/curso') {
    courseModal();
}

if (document.URL === 'http://127.0.0.1:3000/tablero/curso/bcb1ac5bd7d3bd944a04') {
    join();
}