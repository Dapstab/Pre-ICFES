const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  pregunta: {
    type: String,
    required: [true, "Una pregunta no puede estar vacia"],
    trim: true,
  },
  opciones: {
    type: [String],
    required: [true, "Toda pregunta debe tener opciones de respuesta"],
  },
  dificultad: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    required: [true, "Las preguntas deben tener una dificultad"],
  },
  asignatura: {
    type: String,
    enum: {
      values: [
        "Matemáticas",
        "Física",
        "Biología",
        "Español",
        "Inglés",
        "Sociales",
        "Química",
        "Competencias Ciudadanas",
      ],
      message: "La materia no se encuentra",
    },
    required: [true, "Las preguntas deben pertencer a una materia"],
  },
  temas: {
    type: String,
    required: [true, "Las preguntas deben pertencer a un tema"]
  },
  subtemas: {
    type: [String],
    required: [true, "Las preguntas deben pertencer a un subtema"],
  },
  autor: {
    type: String,
    trim: true,
  },
  subidoPor: {
    type: String,
    required: [true, "Las preguntas deben tener un autor"],
    trim: true,
  },
  respuesta: {
    type: Number,
    required: [true, "Toda pregunta debe tener respuestas"],
  },
  referencias: {
    type: String,
  },
});

exports.questionSchema = questionSchema;

questionSchema.path("dificultad").options.enum;

exports.Question = mongoose.model("Question", questionSchema, "preguntas");
