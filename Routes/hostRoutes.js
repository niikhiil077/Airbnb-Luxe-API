//core modules

const express = require('express');
const router = express.Router();

//local modules

const hostController = require('../controller/hostcontroller');



//add home

const addhomeRouter = router.get('/host/addhome', hostController.addhomeController);

//host/homeadded

const homeaddedRouter = router.post('/host/homeadded', hostController.homeaddedController);

//host/edithome

const edithomeRouter = router.get('/host/edithome/:id', hostController.edithomeController);

//post edit home

const postedithomeRouter = router.post('/host/edithome/:id', hostController.edithomeController2);

//host/deletehome

const deletehomeroute = router.get('/host/delete/home/:id', hostController.deletehomeController);


module.exports = { addhomeRouter, homeaddedRouter, edithomeRouter, postedithomeRouter };