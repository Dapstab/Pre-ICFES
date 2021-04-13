const catchAsync = require("../utils/catchAsync");
const Quiz = require("../models/quizModel");
const User = require("../models/userModel");
const asignaturas = require("../utils/data");
const Course = require("../models/courseModel");
const quizStatsModel = require('../models/quizStatsModel');
module.exports = class ViewsController {
  static getHomePage = catchAsync(async (req, res, next) => {
    if (req.user) {
      res.redirect('/dashboard');
    } else {
      res.status(200).render("homePage/homePage", {
        title: "Pagina de Inicio",
      });
    }
  });

  static getDashboard = (req, res, next) => {
    res.status(200).render("dashboard", {
      title: "Tablero",
    });
  };

  static getSignupForm = (req, res) => {
    res.status(200).render("homePage/signup", {
      title: "Regístrate",
    });
  };

  static createQuiz = catchAsync(async (req, res, next) => {
    res.status(200).render("quizzes/createQuiz", {
      title: "Crear Quiz",
      asignaturas,
    });
  });

  static solveQuiz = catchAsync(async (req, res, next) => {
    if (!req.body.solved) {
      const quiz = await Quiz.findById(req.params.quizId);
      return res.status(200).render("quizzes/quiz", {
        title: "Quices",
        quiz,
      });
    }
    res.redirect("/quiz/view");
  });

  static getQuestionForm = (req, res) => {
    res.status(200).render("quizzes/createQuestion", {
      title: "Crea tus preguntas",
      asignaturas,
    });
  };

  static getProfile = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).render("homePage/account", {
      title: "Mi Perfil",
      user,
    });
  });

  static editQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId);
    res.status(200).render('quizzes/editQuiz', {
      title: "Tablero de quiz",
      quiz
    })
  });

  static createCourse = (req, res, next) => {
    res.status(200).render("courses/createCourse", {
      title: "Crear Curso",
    });
  };

  // static joinCourse =  (req, res, next) => {
  //   res.status(200).render("tablero", {
  //     title: 'Tablero'
  //   });
  // };
  // Ir a la página del curso en particular 
  static getCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.courseId);
    res.status(200).render("courses/course", {
      title: course.nombre,
      course
    });
  });
  
  

  static getCourses = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({ path: 'cursos' });
    res.status(200).render("courses/courses", {
      title: "Mis Cursos",
      courses: user.cursos
    });
  });

  // /:course/:quizId
  static getQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId);
    res.status(200).render("courses/courses", {
      title: "Quiz",
      quiz
    });
  });
  // /grades
  static getGrades = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).render("courses/courses", {
      title: "Notas",
      courses: user.cursos
    });
  });

  ///quiz/view/:quizId
  static viewQuiz = catchAsync(async (req, res, next) => {
    // const quizStats = await quizStatsModel.findById(req.params.quizId);
    res.status(200).render("quizzes/viewQuiz", {
      title: "Resultados",
      // quizStats
    });
  });
};



