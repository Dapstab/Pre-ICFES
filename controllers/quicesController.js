const Quiz = require("../models/quizModel");
const Factory = require("./factoryController");
const catchAsync = require("../utils/catchAsync");
const { Question } = require("../models/questionModel");
const User = require("../models/userModel");

module.exports = class QuizController {
  static getQuiz = Factory.getOne(Quiz, { path: "preguntas" });
  static deleteQuiz = Factory.deleteOne(Quiz);
  static updateQuiz = Factory.updateOne(Quiz);
  //static createQuiz = Factory.createOne(Quiz);
  static getAllQuizs = Factory.getAll(Quiz);

  static setUserID = (req, res, next) => {
    req.body.creadoPor = req.user.id;
    next();
  };

  static createQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.create(req.body);
    res.status(200).json({
      status: "success",
      quiz,
    });
  });

  static endQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.id);
    console.log(quiz);
    quiz.preguntas = Factory.getQuizQuestions();
    await quiz.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
    });
  });
  
  static hasBeenSolved = catchAsync(async (req, res, next) => {
    const user = await User.find(
      { _id: req.user._id }, 
      {
        quices: { $elemMatch: { _id: req.body.quizId, nota: { $exists: false } } }
    });
    req.body.solved =  user ? true : false;
    next();
  });
};
