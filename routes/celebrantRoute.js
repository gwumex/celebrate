const express = require('express');
const router = express.Router();
const celebrantController = require('../controller/celebrantController')
const upload = require('../middleware/upload')
router.get('/', celebrantController.home_get)
router.get('/celebrantpage', celebrantController.celebrantpage_get)
router.get('/createpage', celebrantController.createpage_get)
router.post('/createpage', upload.single('image'), celebrantController.createpage_post)
router.get('/checkusers', celebrantController.checkusers_get)

module.exports = router;