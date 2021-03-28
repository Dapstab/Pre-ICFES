import "@babel/polyfill";
import { LoginDOM } from "./pages/login";
import { SignupDOM } from "./pages/signup";
import { QuestionForm } from "./forms/questionForm";
import { createQuiz } from "./forms/quizForm";
import { courseModal } from "./modals/courseModal";
import { join } from "./modals/joinModal";
import { DashboardDOM } from "./pages/dashborad";
import { editQuiz } from "./pages/editQuiz";
import { solveQuiz } from './pages/solveQuiz';
import { showResults } from './pages/viewQuiz';
import { Courses } from './pages/courses';
// HomePage
LoginDOM.login();
LoginDOM.animationInput();

// logout
LoginDOM.logout();

// Sign-up page
SignupDOM.signup();
SignupDOM.animationInput();

//Dashboard
if (document.URL.includes("/dashboard")) {
  DashboardDOM.setActiveNavs();
}

if (document.URL.includes("/quiz/question"))  {
  QuestionForm();
}

if (document.URL === "http://127.0.0.1:3000/quiz") {
  createQuiz();
}

if (document.URL.includes("/course")) {
  /* courseModal();
  join(); */
}

if (document.URL.includes("/quiz/edit")) {
  editQuiz();
}

if (document.URL.includes("/quiz/605fc7dd15e80735002afbd7")) {
  /* SolveQuiz.getAnswers();
  SolveQuiz.sendAnswers(); */
  solveQuiz();
}

if (document.URL.includes('/quiz/view')) {
  showResults();
}

if (document.URL.includes('/courses')) {
  Courses();
}
