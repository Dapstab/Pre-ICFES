const express = require("express");
const AuthController = require("../controllers/authController");
const CourseController = require("../controllers/cursosController");

const router = express.Router();

router.use(AuthController.protect);


// api/v1/curso

router.route('/')
.post(CourseController.addProfessor, CourseController.addKey, CourseController.createCourse);
//.patch(CourseController.joinCourse);


router.route('/:code').patch(CourseController.joinCourse);

//api/v1/curso/:code
//req.params


//body vs params
//definición de urls
//codigo --------------- sale del frontend!

module.exports = router;