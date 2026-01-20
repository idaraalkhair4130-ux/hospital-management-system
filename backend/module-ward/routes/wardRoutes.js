const express = require('express');
const router = express.Router();
const wardController = require('../controllers/wardController');

router.post('/add', wardController.add);
router.get('/list', wardController.list);
router.put('/:id/status', wardController.updateStatus);
router.delete('/:id', wardController.remove);

module.exports = router;
