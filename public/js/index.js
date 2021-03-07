import "@babel/polyfill";
import { LoginDOM } from "./pages/login";
import { SignupDOM } from "./pages/signup";
import { QuestionForm } from "./forms/questionForm";
import { createQuiz } from "./forms/quizForm";
import { courseModal } from "./modals/courseModal";
import { join } from "./modals/joinModal";
import { DashboardDOM } from "./pages/dashborad";
import { editQuiz } from "./pages/editQuiz";

console.log(createQuiz);

// HomePage
LoginDOM.login();
LoginDOM.animationInput();

// logout
LoginDOM.logout();

// Sign-up page
SignupDOM.signup();
SignupDOM.animationInput();

//Dashborad
DashboardDOM.setActiveNavs();

if (document.URL === "http://127.0.0.1:3000/questions/create") {
  QuestionForm();
}

if (document.URL === "http://127.0.0.1:3000/quiz") {
  createQuiz();
}

if (document.URL === "http://127.0.0.1:3000/tablero/curso") {
  courseModal();
}

if (
  document.URL === "http://127.0.0.1:3000/tablero/curso/bcb1ac5bd7d3bd944a04"
) {
  join();
}

if (
  document.URL === "http://127.0.0.1:3000/quiz/604416d57dc248253029121d/edit"
) {
  editQuiz();
}
