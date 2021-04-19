const mongoose = require("mongoose");
const slugify = require("slugify");

const courseSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Las calificaciones deben pertenecerle a un quiz"],
    },
    slug: String,
    profesor: {
      type: mongoose.Schema.ObjectId,
      ref: "Professor",
      required: [true, "Todo curso debe tener un profesor"],
    },
    estudiantes: {
      type: [mongoose.Schema.ObjectId],
      ref: "Student",
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
      type: String,
      required: [true, "Todo curso debe tener un código"],
    },
    // La nota es una propiedad calculada con un pipeline
    // nota: {
    //   type: Number,
    // },
    fechaFinalizacion: Date,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Indexes
courseSchema.index({ profesor: 1, nombre: 1 }, { unique: true }); // Un DETERMINADO usuario no puede crear dos cursos con el mismo nombre

// Document Middleware
courseSchema.pre("save", function (next) {
  this.slug = slugify(this.nombre, { lower: true });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "estudiantes",
    select: "nombre notas", // No se puede excluir a __t, este populate es para los profesores
  });
  next();
});

// Virtual Populate
courseSchema.virtual("quices", {
  ref: "Quiz",
  localField: "_id",
  foreignField: "curso",
});

const Course = mongoose.model("Course", courseSchema, "Cursos");
module.exports = Course;
