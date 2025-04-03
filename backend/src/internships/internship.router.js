const express = require('express');
const { createInternship, getAllInternshipsCount, getInternshipById, getAllInternships } = require('./internship.controller');
// const { loginEmployee } = require('./internship.controller');
const router = express.Router();


router.post("/", createInternship);
router.get('/count', getAllInternshipsCount);
router.get('/:id', getInternshipById);
router.get('/:limit/:page', getAllInternships);


module.exports = router