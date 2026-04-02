const express = require('express');
const { postlogoutController } = require('../controller/logoutcontroller');
const router = express();


const postlogoutRouter = router.post('/logout', postlogoutController);

module.exports = {postlogoutRouter};