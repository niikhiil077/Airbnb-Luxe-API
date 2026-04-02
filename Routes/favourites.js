const express = require('express');
const favouritesController = require('../controller/favouritecontroller');
const router = express.Router();

const getfavHomesRoute = router.get('/host/favourites',favouritesController.getfavhomeController);
const addfavHomeRoute = router.post('/host/favourites',favouritesController.addfavhomeController);
const dltfavHomeroute = router.post('/host/delete/favhomeshome',favouritesController.dltfavhomeController);



module.exports = {getfavHomesRoute , addfavHomeRoute , dltfavHomeroute};