const UsersController = require("../controllers/usersController");
const AuthController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/registro", AuthController.signup);
router.post("/iniciarSesion", AuthController.login);
router.post("/olvidarClave", AuthController.forgotPassword);
router.get("/cerrarSesion", AuthController.logout);
router.patch("/reestablecerClave/:token", AuthController.resetPassword);

//router.use(AuthController.protect);

router.patch("/actualizarMiClave", AuthController.updatePassword);
router.get("/yo", UsersController.getMe, UsersController.getUser);
router.patch("/actualizarYo", UsersController.updateMe);
router.patch("/eliminarYo", UsersController.deleteMe);

//router.use(AuthController.restrictTo("admin"));

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
