const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/create', doctorController.create);
router.get('/list', doctorController.list);
router.get('/:id/fee', doctorController.getFee);
router.get('/:id/schedule', doctorController.getSchedule);

module.exports = router;
