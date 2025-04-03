const { sendResponse } = require("../middleware/response");
const authService = require("./auth.service");
const { employeeLogin } = require("./auth.service");

module.exports = {
    loginUser: async (req, res) => {

        let data = req.body;
        if (!data.email_id || !data.password) {
            return sendResponse(res, false, 400, "Please fill mandatory fields", []);
        }

        const payload = {
            email_id: data?.email_id,
            password: data?.password
        };
        authService.userLogin(payload, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "user not added", []);
            }
            console.log(results, "ress");
            if (results && results.length > 0) {
                userDetails = results[0]
                if (userDetails.password === payload.password) {
                    const { password, ...user } = results[0]
                    return sendResponse(res, true, 200, "Logged in successfully", user);
                } else {
                    return sendResponse(res, true, 200, "Invalid credentials", []);

                }
            } else {
                return sendResponse(res, true, 200, "No user found with given details", []);
            }
        });
    },
    createUser: async (req, res) => {

        let data = req.body;
        if (!data.name || !data.email_id || !data.phone || !data.password|| !data.role) {
            return sendResponse(res, false, 400, "Please fill mandatory fields", []);
        }

        const payload = {
            name: data?.name,
            email_id: data?.email_id,
            phone: data?.phone,
            password: data?.password,
            role:data.role
        };
        authService.addUser(payload, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "user not added", []);
            }
            return sendResponse(res, true, 200, "user added successfully", []);
        });
    },

}