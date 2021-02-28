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
    req.body.usuarios = req.user.id;
    next();
  };

  static joinQuiz = (req, res, next) => {
    req.body = {
      $push: {
        usuarios: req.user.id,
      },
    };
    next();
  };

  static createQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.create(req.body);
    await User.findOneAndUpdate(req.user.id, {
      quices: {
        $push: quiz._id
      }
    });
    await quiz.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      quiz,
    });
  });
};
