const jwt = require("jsonwebtoken");
const config = require('config');

function checkToken(req, res, next) {
    let token = req.get("authorization");
    if (!token) {
        res.send("Access denied! unauthorized user");
    } else {
        token = token.slice(7);
        jwt.verify(token, process.env.SECRET_KEY || config.get('jwt.secretkey'), (error, decoded) => {
            if (error) {
                res.send("Invalid Token");
            } else {
                next();
            }
        })
    }

}

module.exports = { checkToken }