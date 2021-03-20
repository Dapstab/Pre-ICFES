const User = require('./userModel');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    profesores: {
        type: [mongoose.Schema.ObjectId],
        ref: "Professor"
    },
    notas: [{
        quizId: { type: mongoose.Schema.ObjectId },
        nota: Number           
    }]
}, { discriminatorKey: 'role' });

const Student = User.discriminator("Student", studentSchema);
module.exports = Student;