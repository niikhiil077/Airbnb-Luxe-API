const express = require('express');
const router = express.Router();
const homedetailController = require('../controller/homedetailcontroller')


const homedetailRouter = router.get('/host/home/:id', homedetailController);

module.exports = homedetailRouter;