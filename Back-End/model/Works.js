const connection = require("../db");
const {
    SELECT,
    INSERT,
    UPDATE
} = require("../dbTool");

const FIELD = "name,image_url,data,short_description,description,belong_user_id"
class Works {
    constructor() {}

    async getAll() {
        let sql = SELECT("*", "works");
        let data = await new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (!err) {
                    resolve(result)
                }
            });
        });
        return data;
    }

    async addNew(obj) {
        let sql = INSERT("works", [obj.name, obj.imageURL, obj.dataURL, obj.shortDescription, obj.description, obj.author], FIELD);
        let result = await new Promise((resolve, reject) => {
            connection.query(sql, (err, data) => {
                if(!err) {
                    resolve("OK")
                } else {
                    resolve("ERROR")
                }
            })
        });
        return result;
    }

    async getUserWorks(email) {
        let sql = SELECT("*", "works", [{
            field1: "belong_user_id",
            opea: "=",
            field2: email
        }]);
        let result = await new Promise((resolve, reject) => {
            connection.query(sql, (err, data) => {
                if(err) {
                    resolve("ERR")
                } else {
                    resolve(data);
                }
            })
        })
        return result;
    }

    async getWorksInfo(id) {
        let sql = SELECT("*", "works", [{
            field1: "id",
            opea: "=",
            field2: id
        }]);
        return await new Promise((resolve, reject) => {
            connection.query(sql, (err, data) => {
                if(err) {
                    resolve("ERR");
                } else {
                    resolve(data[0]);
                }
            })
        })
    }
}

let works = new Works();
module.exports = works;