const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/create', patientController.create);
router.get('/list', patientController.list);
router.get('/:id', patientController.getOne);
router.put('/update', patientController.update); // Note: Should ideally be /:id/update but complying with list usage style

module.exports = router;
