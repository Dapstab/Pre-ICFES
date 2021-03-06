const User = require("../models/userModel");
const Factory = require("./factoryController");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Student = require("../models/studentModel");

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  allowedFields.forEach((el) => (newObj[el] = obj[el]));
  return newObj;
};

module.exports = class UserController {
  static getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId)
      .populate({ path: "cursos", select: "nombre -estudiantes" })
      .populate({
        path: "cursosCreados",
        select: "nombre estudiantes asignatura -profesor",
      }).
      populate({ path: 'notas', select: "nota curso quiz -estudiante" });
    if (user.rol === "estudiante") {
      user.depopulate("cursosCreados");
    } else if (user.rol === "profesor") {
      user.depopulate("cursos");
    }

    if (!user) {
      return next(
        new AppError("Ningun estudiante encontrado con el ID dado", 404)
      );
    }

    res.status(200).json({
      status: "success",
      user,
    });
  });
  static deleteUser = Factory.deleteOne(User);
  static updateUser = Factory.updateOne(User);
  static createUser = Factory.createOne(User);
  static getAllUsers = Factory.getAll(User);

  static getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
  };

  static updateMe = catchAsync(async (req, res, next) => {
    if (req.body.clave || req.body.confirmarClave) {
      return next(
        new AppError(
          "Esta no es la para cambiar la contraseña porfavor dirigete a: /actualizarContraseña"
        )
      );
    }

    const filterBody = filterObj(req.body, "nombre", "correo");

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      updatedUser,
    });
  });

  static deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {
      activo: false,
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

  /* static addQuizGrade = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.user.id);
    const result = student.notas.push({
      quiz: req.body.quizId,
      nota: req.body.grade,
    });
    await student.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      result,
    }); */
  /* }); */
};
