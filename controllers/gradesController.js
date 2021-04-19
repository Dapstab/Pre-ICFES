const Factory = require("./factoryController");
const catchAsync = require("../utils/catchAsync");
const Grades = require("../models/gradeModel");
module.exports = class QuestionController {
  static getGrades = Factory.getOne(Grades, { path: "comentarios" });
  static createGrades = Factory.createOne(Grades);
  static deleteGrades = Factory.deleteOne(Grades);
  static updateGrades = Factory.updateOne(Grades);
  static getAllGrades = Factory.getAll(Grades);
  
  static getCourseGrades = catchAsync(async (req,res,next) => {
    const grades = await Grades.find({ curso: req.body.courseId }).sort( {nombreEstudiante: 1 });
    res.status(200).json({
        status: "success",
        grades
    });
  });

  static getQuizGrades = catchAsync(async (req,res,next) => {
    const grades = await Grades.find({ quiz: req.body.quizId }).sort({ nombreEstudiante: 1 });
    res.status(200).json({
        status: "success",
        grades
    });
  });
};