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
import { showResults } from './pages/viewQuiz'
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

if (document.URL.includes("/quiz/question"))  {
  QuestionForm();
}

if (document.URL === "http://127.0.0.1:3000/quiz") {
  createQuiz();
}

if (document.URL.includes("/tablero/curso")) {
  courseModal();
  join();
}

if (document.URL.includes("/quiz/edit")) {
  editQuiz();
}

if (document.URL.includes("/quiz/6057f019999cf815745702a4")) {
  /* SolveQuiz.getAnswers();
  SolveQuiz.sendAnswers(); */
  solveQuiz();
}

if (document.URL.includes('/quiz/view')) {
  showResults();
}