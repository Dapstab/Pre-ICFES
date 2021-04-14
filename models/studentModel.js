const User = require("./userModel");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    notas: [
      {
        quizId: {
          type: mongoose.Schema.ObjectId,
          ref: "Quiz",
        },
        nota: Number,
      },
    ],
  },
  {
    discriminatorKey: "role",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Student = User.discriminator("Student", studentSchema);
module.exports = Student;
