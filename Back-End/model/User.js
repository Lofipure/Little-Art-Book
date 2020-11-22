const connection = require("../db");
const {
    SELECT,
    INSERT,
    UPDATE
} = require("../dbTool");
const FIELD = "username,email,password,telephone"

class User {
    constructor() {}

    async createUser(userObject) {
        let sql = INSERT("users", [userObject.username, userObject.email, userObject.password, userObject.telephone], FIELD);
        let insertResult = await new Promise((resolve, reject) => {
            connection.query(sql, (err, data) => {
                if (err) {
                    resolve("ALREADYHAVE");
                } else {
                    resolve("OJBK");
                }
            });
        });
        return insertResult;
    }

    async checkPassword(email, password) {
        const NOUSER = "NOUSER"
        let sql = SELECT("password", "users", [{
            field1: "email",
            opea: "=",
            field2: email
        }]);
        let realPass = await new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (result.length == 0) {
                    resolve(NOUSER)
                } else {
                    resolve(result[0].password)
                }
            })
        });
        if (realPass == NOUSER) {
            return NOUSER;
        } else {
            if (realPass == password) {
                return "YES";
            } else {
                return "NO";
            }
        }
    }

    async getUserInfo(email) {
        let sql = SELECT("*", "users", [{
            field1: "email",
            opea: "=",
            field2: email
        }]);
        let info = await new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err)
                }
            });
        });
        return info[0]
    }

    async changePassword(obj) {
        let {
            email,
            newPassword
        } = obj;
        let sql = UPDATE("users", "password", newPassword, [{
            field1: "email",
            opea: "=",
            field2: email
        }]);
        let result = await new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    resolve("ERROR");
                } else {
                    resolve("OK");
                }
            })
        });
        return result;
    }
}

let user = new User();

module.exports = user;