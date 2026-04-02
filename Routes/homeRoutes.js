//core modules

const express = require('express');
const router = express.Router();


//local modules

const controller = require('../controller/homecontroller')


//home page 

const homepageRouter = router.get('/', controller.homepageController);

//home list

const homelistRouter = router.get('/host/homelist', controller.homelistController);

//favourites




module.exports = { homepageRouter, homelistRouter };