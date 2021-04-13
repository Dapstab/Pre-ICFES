const UsersController = require("../controllers/usersController");
const AuthController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/login", AuthController.signup);
router.post("/signup", AuthController.login);
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
  .route("/:id")
  .get(UsersController.getUser)
  .patch(UsersController.updateUser)
  .delete(UsersController.deleteUser);

/* router.route("/:id/grade").patch(UsersController.updateGrade, UsersController.updateUser); */
/* router.route('/:id/listaAmigos')
.post(AmigosCtrl.sendFriendRequest)
.patch(AmigosCtrl.acceptFriendRequest); */

module.exports = router;
