const catchAsync = require("../utils/catchAsync");
const Quiz = require("../models/quizModel");
const User = require("../models/userModel");
const asignaturas = require("../utils/data");
module.exports = class ViewsController {
  static getHomePage = catchAsync(async (req, res, next) => {
    res.status(200).render("homePage", {
      title: "Pagina de Inicio",
    });
  });

  static getSignupForm = (req, res) => {
    res.status(200).render("signup", {
      title: "Regístrate",
    });
  };

  static createQuiz = catchAsync(async (req, res, next) => {
    res.status(200).render("createQuiz", {
      title: "Crear Quiz",
      asignaturas
    });
  });

  static solveQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId);
    res.status(200).render("quiz", {
      title: "Quices",
      quiz
    });
  });

  static getQuestionForm = (req, res) => {
    res.status(200).render("createQuestion", {
      title: "Crea tus preguntas",
      asignaturas
    });
  };

  static getProfile = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).render("account", {
      title: "Mi Perfil",
      user,
    });
  });

  static editQuiz = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    console.log(user);
    res.status(200).render("editQuiz", {
      title: 'Tablero de quiz',
      quizzes: user.quices
    });
  });

  static createCourse = (req, res, next) => {
    res.status(200).render("createCourse", {
      title: 'Crear Curso'
    });
  };

  static joinCourse =  (req, res, next) => {
    res.status(200).render("tablero", {
      title: 'Tablero'
    });
  };
};
