const mongoose = require("mongoose");
const { questionSchema } = require("./questionModel");
const slugify = require('slugify');

const quizSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      maxlength: [20, "El titulo no pude pasar los  20 caracteres"],
      required: [true, "Todo quiz debe tener un nombre"],
    },
    slug: String,
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
      /* required: [true, "Los quices deben tener una fecha de entrega"], */
    },
    preguntas: [questionSchema],
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
    curso: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "Todo quiz debe pertenecer a un curso"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

quizSchema.pre('save', function(next) {
  this.slug = slugify(this.nombre, { lower: true })
})

const Quiz = mongoose.model("Quiz", quizSchema, "Quices");

module.exports = Quiz;
