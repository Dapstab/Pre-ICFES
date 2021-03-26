const Quiz = require("../models/quizModel");
const Factory = require("./factoryController");
const catchAsync = require("../utils/catchAsync");
const Student = require("../models/studentModel");
const Course = require("../models/courseModel"); 

module.exports = class QuizController {
  static getQuiz = Factory.getOne(Quiz, { path: "preguntas" });
  static deleteQuiz = Factory.deleteOne(Quiz);
  static updateQuiz = Factory.updateOne(Quiz);
  static getAllQuizs = Factory.getAll(Quiz);
  
  static createQuiz = catchAsync ( async (req, res, next) => {
    const course = await Course.findById(req.body.cursoId);
    delete req.body.cursoId;
    const quiz = await Quiz.create(req.body);
    course.quices.push(quiz);
    await course.save();
    res.status(200).json({
      status: "success",
      newDoc: quiz
    });
  });

  static addUploadedBy = (req, res, next) => {
    req.body.creadoPor = req.user.nombre;
    next();
  };
  static endQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.id);
    quiz.preguntas = req.body;
    await quiz.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
    });
  });

  static hasBeenSolved = catchAsync(async (req, res, next) => {
    const user = await Student.find(
      { _id: req.user._id },
      {
        notas: {
          $elemMatch: { _id: req.params.quizId },
        },
      }
    );
    req.body.solved = user ? true : false;
    next();
  });
};
