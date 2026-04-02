const express = require('express');
const { getSignupcontroller, postSignupcontroller } = require('../controller/signupcontroller');
const router = express.Router();


const getSignup = router.get('/signup',getSignupcontroller)
const postSignup  = router.post('/signup',postSignupcontroller)

module.exports={getSignup , postSignup};
