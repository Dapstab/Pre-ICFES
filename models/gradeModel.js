const mongoose = require("mongoose");

const gradesSchema = new mongoose.Schema({
  nombreEstudiante: {
    type: String,
    required: [true, 'Toda nota debe tener el nombre del estudiante.']
  },
  estudiante: {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
      required: [true, "No existe estudiante al cual asociarle una estadistica"],
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: "Quiz",
    required: [true, "Toda estadistica debe pertenecer a un quiz"],
  },
  nota: {
    type: Number,
    required: [true, "Las estadisticas deben tener las notas"],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
  curso: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, "Toda nota debe tener un curso."]
  }
});

const Grades = mongoose.model("Grades", gradesSchema);
module.exports = Grades;