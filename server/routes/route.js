const { signin } = require("../controllers/signinController");
const { signup } = require("../controllers/signupController");
const { createEmployee } = require("../controllers/createController");
const { editEmployee } = require("../controllers/editController");
const { getEmployeeData } = require("../controllers/dataController");
const { authenticateUser } = require("../controllers/authController");

const router = require("express").Router();
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/createEmployee").post(authenticateUser, createEmployee);
router.route("/editEmployee").put(authenticateUser, editEmployee);
router.route("/getEmployeeData").get(authenticateUser, getEmployeeData);

module.exports = router;
