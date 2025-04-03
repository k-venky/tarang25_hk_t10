const pool = require('../config/db').pool

module.exports = {

    addIntership: async (data, callBack) => {
        const { title, description, company, location,image_link } = data
        pool.query(
            "INSERT INTO internships (title, description, company, location,image_link) VALUES ($1, $2, $3, $4,$5) RETURNING *",
            [title, description, company, location,image_link],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },

    updateIntership: async (data, callBack) => {
        const { first_name, last_name, email_id, phone } = data
        pool.query(
            `UPDATE internships SET title=$1 RETURNING id`,
            [first_name, last_name, email_id, phone],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },

    fetchInternshipById: async (id, callBack) => {

        pool.query(
            `SELECT * FROM internships WHERE id=$1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },

    fetchAllInterships: async (req, callBack) => {
        const params = req.params;

        limit = `LIMIT ${params?.limit} OFFSET ${(params?.page - 1) * params?.limit}`;
        extCond = "WHERE TRUE ";
        order = ` ORDER BY e.id DESC `;

        pool.query(
            `SELECT id,title,description,company,location,image_link,created_at FROM internships e  ${extCond} ${order}${limit}`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },

    fetchAllInternshipsCount: async (callBack) => {

        pool.query(
            `SELECT COUNT(id) AS total FROM internships`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },
}