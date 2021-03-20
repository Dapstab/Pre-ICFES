const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Factory = require("./factoryController");
const Course = require("../models/courseModel");


module.exports = class CourseController {
    static getCourse = Factory.getOne(Course);
    static deleteCourse = Factory.deleteOne(Course);
    static updateCousre = Factory.updateOne(Course);
    static createCourse = Factory.createOne(Course);
    static addProfessor = (req, res, next) => {
        req.body.profesor = req.user.id;
        next();
    }
    static addKey = (req, res, next) => {
        req.body.codigo = req.params.code;
        next();
    }
    static joinCourse = catchAsync(async (req, res, next) => {
        const course = await Course.findOne({ codigo: req.params.code });
        if (course) {
            course.estudiantes.push(req.user.id);
            await course.save();
            return res.status(200).json({
                res: 'Se actualizó exitosamente el curso'
            });
        }
        return new AppError('Código Inválido.', 401);
    });
}