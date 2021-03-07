const express = require("express");
const QuicesController = require("../controllers/quicesController");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.use(AuthController.protect);

router
  .route("/:id")
  .get(QuicesController.getQuiz)
  .patch(QuicesController.updateQuiz);

router.route("/").post(QuicesController.setUserID, QuicesController.createQuiz);

module.exports = router;
