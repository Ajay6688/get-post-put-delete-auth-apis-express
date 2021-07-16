const { create, login, getUsers, update, deleteUser, verifyNumber, resetPass, check_otp } = require("./services");
const { registerSchema, loginSchema, updateSchema, delSchema, forgotPassSchema, resetPassSchema, otpCheckSchema } = require("../validations/joi_validations");
const { sendOtp } = require("../authorization/send_sms");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = require('config');
async function createUser(req, res) {
    try {
        let body = req.body;
        const joiresult = await registerSchema.validate(body);
        if (joiresult.error) {
            return res.status(400).send({
                "status": 400,
                "error": joiresult.error.details[0].message
            });
        }
        body.password = await bcrypt.hash(body.password, 10);
        let createResponse = await create(body);
        let response = req.body;
        delete response.password;
        return res.status(200).send({
            "status": 200,
            "message": "Registration Successfull",
            "data": {
                ...response,
                id: createResponse.insertId
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function userLogin(req, res) {
    try {
        const body = req.body;
        const joiresult = await loginSchema.validate(body);
        if (joiresult.error) {
            return res.status(400).send({
                "status": 400,
                "error": joiresult.error.details[0].message
            });
        }
        let createResponse = await login(body.email)
        const result = await bcrypt.compare(body.password, createResponse.password);
        if (result == false) {
            res.status(400).send({
                "status": 400,
                "error": "incorrect password"
            });
        }
        if (result) {
            createResponse.password = undefined;
            const jsontoken = jwt.sign({ result: createResponse }, process.env.SECRET_KEY || config.get('jwt.secretkey'), {
                expiresIn: "2h"
            });
            return res.status(200).send({
                "status": 200,
                "message": "You have logged in successfuly",
                "token": jsontoken
            });
        }
    } catch (error) {
        res.status(400).send({
            "error": "Invalid Email or Password"
        });
    }
}


async function updateUser(req, res) {
    try {
        const body = req.body;
        const joiresult = await updateSchema.validate(body);
        if (joiresult.error) {
            return res.status(400).send({
                "status": 400,
                "error": joiresult.error.details[0].message
            });
        }
        body.password = await bcrypt.hash(body.password, 10);
        let createResponse = await update(body)
        return res.status(200).send({
            "status": 200,
            "message": "Successfully Updated",
            "data": createResponse
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getUsersData(req, res) {
    try {
        let createResponse = await getUsers()
        return res.status(200).send(createResponse);
    } catch (error) {
        res.status(400).send(error);
    }
};

async function delUser(req, res) {
    try {
        const body = req.body;
        const joiresult = await delSchema.validate(body);
        if (joiresult.error) {
            res.status(400).send({
                "status": 400,
                "error": joiresult.error.details[0].message
            });
        }
        let createResponse = await deleteUser(body);
        return res.status(200).send({
            "status": 200,
            "message": "Successfully Deleted",
            "data": createResponse
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function forgotPassword(req, res) {
    try {
        const body = req.body;

        const joiresult = await forgotPassSchema.validate(body);
        if (joiresult.error) {
            return res.status(400).send({
                "status": 400,
                "error": joiresult.error.details[0].message
            });
        }
        let createResponse = await verifyNumber(body.phoneNumber);

        if (createResponse[0]) {
            let results = await sendOtp(body.phoneNumber);
            return res.status(200).send({
                "status": 200,
                "message": "Otp sent successfully on your registered phone number",
                "data": results
            });
        } else {
            return res.status(400).send({
                "status": 400,
                "error": "Phone number is not registered"
            })
        }
    } catch (error) {
        return res.status(400).send(error);
    }
}

async function checkOtp(req, res) {
    try {
        const body = req.body;
        const joiresult = await otpCheckSchema.validate(body);
        if (joiresult.error) {
            return res.status(400).send({
                "status": 400,
                "error": joiresult.error.details[0].message
            });
        }
        let createResponse = await check_otp(body);
        if (body.otp == createResponse.otp) {
            delete createResponse.password;
            delete createResponse.otp;
            return res.status(200).send({
                "status": 200,
                "message": "otp matched successfully",
                "data": createResponse
            });
        } else {
            return res.status(400).send({
                "status": 400,
                "error": "wrong otp"
            });
        }
    } catch (error) {
        return res.status(400).send(error);
    }
}

async function resetPassword(req, res) {
    try {
        const body = req.body;
        const joiresult = await resetPassSchema.validate(body);
        if (joiresult.error) {
            return res.status(400).send({
                "status": 400,
                "error": joiresult.error.details[0].message
            });
        }
        body.newPassword = await bcrypt.hash(body.newPassword, 10);
        let createResponse = await resetPass(body);
        return res.status(200).send({
            "status": 200,
            "message": "password updated successfully",
            "data": createResponse
        });
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    createUser,
    userLogin,
    getUsersData,
    updateUser,
    delUser,
    forgotPassword,
    resetPassword,
    checkOtp
}