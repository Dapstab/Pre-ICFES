const express = require("express");
const QuicesController = require("../controllers/quicesController");
const AuthController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(AuthController.protect);

router.patch("/edit/:id", QuicesController.endQuiz);

router.route("/").post(QuicesController.setCourseId, QuicesController.addUploadedBy, QuicesController.createQuiz);

router
  .route("/:id")
  .get(QuicesController.getQuiz)
  .patch(QuicesController.updateQuiz);


//router.route("/").post(QuicesController.setUserID, QuicesController.createQuiz);


module.exports = router;
