const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Factory = require("./factoryController");
const crypto = require("crypto");
const Course = require("../models/courseModel");
// const Professor = require("../models/professorModel");

module.exports = class CourseController {
  static addProfessor = (req, res, next) => {
    req.body.profesor = req.user.id;
    next();
  };

  static addKey = (req, res, next) => {
    req.body.codigo = crypto.randomBytes(8).toString("hex");
    next();
  };

  static getCourse = catchAsync(async (req, res, next) => {
    // Get course with quizzes (if (req.user.role === 'teacher'))
    const course = await Course.findById(req.params.courseId).populate({
      path: "quizzes",
      select: "-curso",
    });

    if (!course) {
      return next(
        new AppError("No se ha encontrado el curso con el id dado", 404)
      );
    }
    res.status(200).json({
      status: "success",
      course,
    });
  });
  static deleteCourse = Factory.deleteOne(Course);
  static updateCousre = Factory.updateOne(Course);

  // static createCourse = catchAsync(async (req, res, next) => {
  //   const course = await Factory.createOne(Course);
  //   Professor.cursos.push(course);
  //   await Professor.save({ validateBeforeSave: false });
  //   res.status(201).json({
  //     status: "success",
  //   });
  // });

  static createCourse = catchAsync(async (req, res, next) => {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
  });

  static joinCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findOne({ codigo: req.body.code });
    if (course) {
      course.estudiantes.push(req.user.id);
      await course.save();
      return res.status(200).json({
        status: "success",
        message: "Se actualizó exitosamente el curso",
      });
    }
    return new AppError("Código Inválido.", 401);
  });
};
