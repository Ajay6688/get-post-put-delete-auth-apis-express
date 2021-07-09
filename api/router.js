const { createUser, userLogin, getUsersData, updateUser, delUser, forgotPassword, resetPassword, checkOtp } = require("./controller");
const router = require("express").Router();
const { checkToken } = require("../authorization/token_validation");

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/getusers", checkToken, getUsersData);
router.patch("/update", checkToken, updateUser);
router.delete("/delete", checkToken, delUser);
router.patch('/forgot-password', forgotPassword);
router.post('/check-otp', checkOtp);
router.patch('/reset-password', resetPassword);

module.exports = { router };