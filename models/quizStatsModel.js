const mongoose = require("mongoose");

const quizStatsSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quiz'
    },
    resultados: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        respuestas: [String]
    }]
});

const QuizStats = mongoose.model("QuizStats", quizStatsSchema, "EstadisticasQuiz");

module.exports = QuizStats;
