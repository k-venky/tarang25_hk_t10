
const sendResponse = (res, status, code, message, data = []) => {
    res.status(code).json({
        status: status?"success":"fail",
        code: code,
        message: message || "An error occurred",
        data: data || []
    });
};

module.exports = { sendResponse };