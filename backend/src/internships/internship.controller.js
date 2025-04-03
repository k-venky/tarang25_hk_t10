const { sendResponse } = require("../middleware/response");
const { addIntership,fetchInternshipById, fetchAllInterships,fetchAllInternshipsCount } = require("./internship.service");

module.exports = {
    createInternship: async (req, res) => {

        let data = req.body;
        if(!data.title){
            return sendResponse(res, false, 400, "Title is required", []);
        }
    
        addIntership(data, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "Internship not created", []);
            }
            return sendResponse(res, true, 200, "Internship created successfully", []);
        });
    },


    getInternshipById: async (req, res) => {

        let data = req.params;
        if (!data.id) {
            return sendResponse(res, false, 400, "Id is required", []);
        }

        fetchInternshipById(data.id, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "Internship details error ", []);
            }
            if (results && results.length > 0) {
                const { password, ...employeeDetails } = results[0]
                return sendResponse(res, true, 200, "Internship details", employeeDetails);
            } else {
                return sendResponse(res, true, 200, "Internship details not found", {});

            }
        });
    },
    getAllInternships: async (req, res) => {
        if (!req.params.limit || !req.params.page) {
            return sendResponse(res, false, 500, "Page and Limit is required");
        };

        fetchAllInterships(req, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "Internship list error ", []);
            }

            return sendResponse(res, true, 200, "Internship list", results);


        });
    },
    getAllInternshipsCount: async (req, res) => {


        fetchAllInternshipsCount((err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "Internship list error ", []);
            }
            // console.log(results);

            return sendResponse(res, true, 200, "Total Internship count ", { total: results[0].total });


        });
    },
}