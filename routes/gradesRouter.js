const express = require("express");
const GradesController = require("../controllers/gradesController");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.use(AuthController.protect);

router.route('/course').get(GradesController.getCourseGrades);
router.route("/quiz").get(GradesController.getQuizGrades);
router
  .route("/:id")
  .get(GradesController.getGrades)
  .patch(GradesController.updateGrades)
  .delete(GradesController.deleteGrades);

router.route("/").post(GradesController.createGrades);
//router.route("/").post(QuicesController.setUserID, QuicesController.createQuiz);

module.exports = router;
