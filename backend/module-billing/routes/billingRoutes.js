const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

router.post('/create', billingController.create);
router.get('/list', billingController.list);
router.put('/:id/pay', billingController.pay);
router.delete('/:id', billingController.remove);

module.exports = router;
