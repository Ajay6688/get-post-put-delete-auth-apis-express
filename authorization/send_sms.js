require("dotenv").config()
const config = require('config');
const { conn } = require("../config/db_connections");
const otpGenerator = require('otp-generator');

function sendOtp(phoneNumber) {
    return new Promise((resolve, reject) => {
        const otp = otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets: false });

        const account_sid = process.env.TWILIO_ACCOUNT_SID || config.get('twilio.TWILIO_ACCOUNT_SID');
        const authToken = process.env.TWILIO_AUTH_TOKEN || config.get('twilio.TWILIO_AUTH_TOKEN');
        const otpMessage = "your varification otp is : " + otp;

        // console.log(otpMessage);
        const client = require("twilio")(account_sid, authToken);
        client.messages.create({
                body: otpMessage,
                from: '+13098577499',
                to: phoneNumber
            })
            // .then(message => console.log(message.sid));  
        conn.query("update registrations set otp = ? where phoneNumber=?", [otp, phoneNumber], (error, results) => {
            if (error) {
                console.log(error);
                reject();
            }
            resolve(results);
        });
    });
}

module.exports = { sendOtp }