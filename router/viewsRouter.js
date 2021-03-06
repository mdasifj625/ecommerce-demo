const express = require('express');
const viewsController = require('../controller/viewsController');
const router = express.Router();


router.get('/', viewsController.getOverview);
router.get('/login', viewsController.getLogin);


module.exports = router;