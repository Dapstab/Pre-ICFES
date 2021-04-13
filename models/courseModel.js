const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
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
  quices: 
    {
    type: [mongoose.Schema.ObjectId],
    ref: 'Quiz'
  },
  nota: {
    type: Number
  },
  fechaFinalizacion: Date
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });


// Indexes
courseSchema.index({ professor: 1, name: 1 }, { unique: true }); // Un DETERMINADO usuario no puede crear dos cursos con el mismo nombre

// Document Middleware
courseSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "students",
    select: "name grades", // No se puede excluir a __t, este populate es para los profesores
  });
  next();
});

// Virtual Populate
courseSchema.virtual("quizzes", {
  ref: "QuizMerge",
  localField: "_id",
  foreignField: "course",
});

const Course = mongoose.model("Course", courseSchema, "Cursos");
module.exports = Course
