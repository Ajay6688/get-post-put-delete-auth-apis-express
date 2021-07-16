const { response } = require('express');
const { conn } = require('../config/db_connections');

function create(data) {
    return new Promise((resolve, reject) => {
        conn.query("insert into registrations (name ,email , phoneNumber, password ) values(?,?,?,?)", [data.name, data.email, data.phoneNumber, data.password], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    })

}

function login(data) {
    return new Promise((resolve, reject) => {
        conn.query("select * from registrations where email = ?", [data], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        conn.query("select * from registrations", (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    })
}

function update(data, callback) {
    return new Promise((resolve, reject) => {
        conn.query("update registrations set name=? , email=? ,phoneNumber=? ,password=? where id = ?", [data.name, data.email, data.phoneNumber, data.password, data.id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
    })
}

function deleteUser(data, callback) {
    return new Promise((resolve, reject) => {
        conn.query("delete from registrations where id = ? ", [data.id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
    });
}

function verifyNumber(phoneNumber) {
    return new Promise((resolve, response) => {
        conn.query("select * from registrations where phoneNumber=?", [phoneNumber], (error, results) => {
            if (error) {
                return reject(error)
            }
            return resolve(results);
        });
    });
}

function check_otp(data) {
    return new Promise((resolve, reject) => {
        conn.query("select * from registrations where phoneNumber = ? ", [data.phoneNumber], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results[0]);
        })
    })
}

function resetPass(data) {
    return new Promise((resolve, reject) => {
        conn.query("update registrations set password = ? , otp = ? where phoneNumber= ?", [data.newPassword, null, data.phoneNumber], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        })
    })
}

module.exports = { create, login, getUsers, update, deleteUser, verifyNumber, resetPass, check_otp }