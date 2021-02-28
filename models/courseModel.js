const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Las calificaciones deben pertenecerle a un quiz"],
  },
  profesor: {
    type: mongoose.Schema.ObjectId,
    ref: "Professor",
    required: [true, "Todo curso debe tener un profesor"],
  },
  estudiantes: {
    type: [mongoose.Schema.ObjectId],
    ref: "Student",
    required: [true, "Todo curso debe tener estudiantes"],
  },
  asignatura: {
      type: String,
      required: [true, "El curso debe tener una asignatura"],
  },
  fechaCreacion: {
      type: Date,
      default: Date.now(),
  },
  codigo: {
    type: String
  },
  fechaFinalizacion: Date
});

const Course = mongoose.model("Course", courseSchema, "Cursos");
module.exports = Course;
