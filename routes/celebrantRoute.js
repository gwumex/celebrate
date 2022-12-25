const express = require('express');
const router = express.Router();
const celebrantController = require('../controller/celebrantController')
router.get('/', celebrantController.home_get)
router.get('/celebrantpage', celebrantController.celebrantpage_get)
router.get('/createpage', celebrantController.createpage_get)
router.post('/createpage', celebrantController.createpage_post)

module.exports = router;