const express = require("express");
const AuthController = require("../controllers/authController");
const QuestionController = require("../controllers/questionsController");
const { Question } = require("../models/questionModel");

const router = express.Router();

router.use(AuthController.protect);
// router.use(AuthController.restrictTo("admin", "contribuidor"));

router
  .route("/")
  .get(QuestionController.getAllQuestions)
  .post(QuestionController.addUploadedBy, QuestionController.createQuestion);
router
  .route("/:id")
  .get(QuestionController.getQuestion)
  .patch(QuestionController.updateQuestion)
  .delete(QuestionController.deleteQuestion);
router.post("/quiz", QuestionController.addQuestion);
router.post("/topics", QuestionController.getData);
router.post("/subtopics", QuestionController.getData);
module.exports = router;
