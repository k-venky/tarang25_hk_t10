const express = require('express');
const { loginEmployee, registerUser, createUser, loginUser } = require('./auth.controller');
const router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUser);


module.exports=router