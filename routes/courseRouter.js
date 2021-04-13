const express = require("express");
const AuthController = require("../controllers/authController");
const CourseController = require("../controllers/coursesController");
const quizRouter = require("./quicesRouter");

const router = express.Router();

// router.use('/:courseId/quiz', quizRouter);

router.use(AuthController.protect);
router.use("/:courseId/quiz", quizRouter);
// api/v1/curso

router
  .route("/")
  .post(CourseController.addProfessor, CourseController.createCourse);
//.patch(CourseController.joinCourse);

router.route("/:courseId").get(CourseController.getCourse);

module.exports = router;
