const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');

router.post('/add', pharmacyController.add);
router.get('/list', pharmacyController.list);
router.put('/update', pharmacyController.update);
router.post('/issue', pharmacyController.issue);

module.exports = router;
