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

if (document.URL === "http://127.0.0.1:3000/course") {
  courseModal();
}

if (document.URL.includes("/quiz/edit")) {
  editQuiz();
}

/* if (document.URL.includes("/quiz/607e094395de11144ce30c0d")) {
  SolveQuiz.getAnswers();
  SolveQuiz.sendAnswers();
  solveQuiz();
} */
solveQuiz();
if (document.URL.includes('/quiz/view')) {
  showResults();
}

if (document.URL.includes('/courses')) {
  Courses();
}
