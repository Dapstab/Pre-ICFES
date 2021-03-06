const express = require("express");
const ViewsController = require("../controllers/viewsController");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.use(AuthController.isLoggedIn);

router.get("/", ViewsController.getHomePage);
router.get("/registro", ViewsController.getSignupForm);

router.use(AuthController.isLoggedIn);
router.get("/perfil", ViewsController.getProfile);

// DASHBOARD
router.route("/tablero").get(ViewsController.getDashboard);

// Perfil
router.get("/tablero/perfil", ViewsController.getAccount);

// COURSE

//tablero/curso/:code
router.route("/tablero/curso").get(ViewsController.createCourse);
// router.route("/tablero/curso/:code").patch(ViewsController.joinCourse); Crear nueva pug en vez de tablero

// QUIZ

router.get("/quiz/:quizId/edit", ViewsController.editQuiz);
router.get("/quiz/:quizId", ViewsController.solveQuiz);
router.get("/questions/create", ViewsController.getQuestionForm);

router.get("/quiz", ViewsController.createQuiz);
// router.get("/tablero/curso/:code", ViewsController.joinCourse);

module.exports = router;
