const express = require('express');
const { loginGetController, loginPostController } = require('../controller/loginController');
const router =  express.Router();

const loginGetRouter=  router.get('/login',loginGetController);

const loginPostRouter = router.post('/login',loginPostController);

module.exports = {loginGetRouter , loginPostRouter};