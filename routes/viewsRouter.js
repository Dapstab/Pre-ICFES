const express = require("express");
const ViewsController = require("../controllers/viewsController");
const AuthController = require("../controllers/authController");
const QuicesController = require("../controllers/quicesController");
const router = express.Router();

router.use(AuthController.isLoggedIn);

router.get("/", ViewsController.getHomePage);
router.get("/registro", ViewsController.getSignupForm);

router.use(AuthController.isLoggedIn);
router.get("/perfil", ViewsController.getProfile);

// DASHBOARD
router.route("/dashboard").get(ViewsController.getDashboard);

// GRADES

router.get("/grades", ViewsController.getGrades);

// QUIZ
router.get("/quiz", ViewsController.createQuiz); //Crear Quiz
router.get("/quiz/question", ViewsController.getQuestionForm); //Agregar pregunta
router.get("/quiz/edit", ViewsController.editQuiz); //Quiz Dashboards
router.get("/quiz/view/:slug", ViewsController.viewQuiz);
/* router.get("/quiz/edit/:quizId", ViewsController.editQuiz);  //Quiz Dashboards
router.get('/quiz/view/:quizId', ViewsController.viewQuiz); */
router.get(
  "/quiz/:quizId",
  QuicesController.hasBeenSolved,
  ViewsController.solveQuiz
); // Solve Quiz
// COURSE

router.get("/courses", ViewsController.getCourses); //Courses
router.get("/course", ViewsController.createCourse);
router.get("/course/:courseId", ViewsController.getCourse); // Particular Course
router.get("/course/:courseId/:quizId", ViewsController.getQuiz); //Particular Quiz

// router.route("/tablero/curso/:code").patch(ViewsController.joinCourse); Crear nueva pug en vez de tablero

// router.get("/tablero/curso/:code", ViewsController.joinCourse);

module.exports = router;
