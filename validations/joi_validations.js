const joi = require('@hapi/joi');

//register shcema
const registerSchema = joi.object({
    name: joi.string().min(2).max(40).required(),
    email: joi.string().email().lowercase().required(),
    phoneNumber: joi.string().min(13).max(15).required(),
    password: joi.string().min(6).max(20).required()
});

const loginSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).max(20).required()
});

const updateSchema = joi.object({
    id: joi.number().required(),
    name: joi.string().min(2).max(40).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).max(20).required()
});

const delSchema = joi.object({
    id: joi.number().required()
});

const forgotPassSchema = joi.object({
    phoneNumber: joi.string().min(13).max(15).required()
});

const resetPassSchema = joi.object({
    phoneNumber: joi.string().min(13).required(),
    newPassword: joi.string().min(6).max(20).required()
})

const otpCheckSchema = joi.object({
    otp: joi.string().min(4).max(4).required(),
    phoneNumber: joi.string().min(13).max(15).required()
})

module.exports = {
    registerSchema,
    loginSchema,
    updateSchema,
    delSchema,
    forgotPassSchema,
    resetPassSchema,
    otpCheckSchema
}