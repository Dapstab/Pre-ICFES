const mongoose = require("mongoose");
const slugify = require("slugify");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Todo curso debe tener un nombre"],
    },
    slug: String, // Para no poner id´s en la url de viewRouter
    // Con esto los cursos no tienen conocimiento de los quizzes solo atraves de un virtual populate, todo esto debido a que ahora hay un parent referencing de quiz a course. (Los quizzes guardan el Id del curso), con child referencing lo que tendriamos que hacer es actualizar a cada rato el courseModel.
    // quizzes: {
    //   type: [mongoose.Schema.ObjectId],
    //   ref: "QuizMerge",
    // },
    subject: {
      type: String,
      required: [true, "Todo curso debe ser de una asignatura"],
    },

    // Hay una ventaja inherente al hacer parent Refrencing, y es que es mas lógico que el usuario no tenga nada que ver al momento de crearse con los cursos, es cuando se crea un curso que se sabe del usuario al que le pertenece.
    professor: {
      type: mongoose.Schema.ObjectId,
      ref: "Professor",
      required: [true, "Todo curso debe pertenecer a un profesor"],
    },
    students: {
      type: [mongoose.Schema.ObjectId],
      ref: "Student",
    },
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

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

const CourseMerge = mongoose.model("CourseMerge", courseSchema);

module.exports = CourseMerge;