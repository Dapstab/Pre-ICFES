const User = require("./userModel");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    profesores: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Professor'
    }
  },
  {
    discriminatorKey: "role",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

studentSchema.virtual('notas', {
  localField: '_id',
  ref: 'Grades',
  foreignField: 'estudiante'
})

const Student = User.discriminator("Student", studentSchema);
module.exports = Student;
