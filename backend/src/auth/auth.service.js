const pool = require('../config/db').pool

module.exports = {
    addUser: async (data, callBack) => {
        const { name, email_id, phone, password ,role} = data
        pool.query(
            `insert into users(name,email_id,phone,password,role)values($1,$2,$3,$4,$5) RETURNING id`,
            [name, email_id, phone, password,role],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },

    userLogin: async (data, callBack) => {
        const { email_id} = data
        pool.query(
            `SELECT * FROM users where email_id=$1`,
            [email_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },
}