const mongoose = require("mongoose");
const { questionSchema } = require("./questionModel");

const quizSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      maxlength: [20, "El titulo no pude pasar los  20 caracteres"],
      required: [true, "Todo quiz debe tener un nombre"],
    },
    nPreguntas: {
      type: Number,
    },
    asignatura: {
      type: String,
      required: [true, "Por favor escoja una materia"],
    },
    temas: {
      type: String,
    },
    creadoPor: {
      type: String,
      required: [true, "Los quices deben tener un autor"],
      trim: true,
    },
    fechaEntrega: {
      type: Date,
      required: [true, "Los quices deben tener una fecha de entrega"],
    },
    preguntas: [questionSchema],
    /* tipo: {
      type: String,
      enum: ["personalizable", "aleatorio"],
      default: "aleatorio",
    }, */
    fechaCreacion: {
      type: Date,
      default: Date.now(),
    },
    etapa: {
      type: String,
      default: "sin publicar",
    },
    tiempo: {
      type: Number,
      required: [true, "Los quices deben tener una fecha de duración"],
    },
    descripcion: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Quiz = mongoose.model("Quiz", quizSchema, "Quices");

module.exports = Quiz;
