const express = require('express');
const viewsController = require('../controller/viewsController');
const router = express.Router();


router.get('/', viewsController.getOverview);


module.exports = router;