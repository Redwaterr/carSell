const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/userController");

router.post("/user/signUp",userCtrl.signUp);
router.post("/user/login",userCtrl.login);

module.exports = router;