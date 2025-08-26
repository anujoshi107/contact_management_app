const express = require("express");
const validatetoken = require("../middleware/validatetokenhandler");
const router = express.Router();

// Import the controller functions
const { registeruser, loginuser, currentuser } = require("../controllers/user_controller");

// Define routes for users
router.route("/login").post(loginuser);
router.route("/register").post(registeruser);
router.route("/current").get(validatetoken,currentuser);
module.exports = router;