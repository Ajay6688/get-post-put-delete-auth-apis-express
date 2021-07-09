const { createUser, userLogin, getUsersData, updateUser, delUser, forgotPassword, resetPassword, checkOtp } = require("./controller");
const router = require("express").Router();
const { checkToken } = require("../authorization/token_validation");

router.post("/api/register", createUser);
router.post("/api/login", userLogin);
router.get("/api/getusers", checkToken, getUsersData);
router.patch("/api/update", checkToken, updateUser);
router.delete("/api/delete", checkToken, delUser);
router.patch('/api/forgot-password', forgotPassword);
router.post('/api/check-otp', checkOtp);
router.patch('/api/reset-password', resetPassword);

module.exports = { router };