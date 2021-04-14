const User = require('./userModel');
const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    estudiantes: {
        type: [mongoose.Schema.objectId],
        ref: "Student"
    },
    materia: {
        type: String
    }
},  {
    discriminatorKey: "role",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

const Professor = User.discriminator("Professor", professorSchema);

module.exports = Professor;