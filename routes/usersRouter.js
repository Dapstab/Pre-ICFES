const UsersController = require("../controllers/usersController");
const AuthController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.get("/logout", AuthController.logout);

router.post("/forgotPassword", AuthController.forgotPassword);
router.patch("/resetPassword/:token", AuthController.resetPassword);

router.use(AuthController.protect);

router.patch("/updateMyPassword", AuthController.updatePassword);
router.get("/me", UsersController.getMe, UsersController.getUser);
router.patch("/updateMe", UsersController.updateMe);
router.patch("/deleteMe", UsersController.deleteMe);

// router.use(AuthController.restrictTo("admin"));

router
  .route("/")
  .post(UsersController.createUser)
  .get(UsersController.getAllUsers)
  .patch(UsersController.addQuizGrade); // Se cambio el factory a req.user.id es por ello que no usamos req.params

router
  .route("/:userId")
  .get(UsersController.getUser)
  .patch(UsersController.updateUser)
  .delete(UsersController.deleteUser);

module.exports = router;
