const express = require('express');
const router = express.Router();
const receptionController = require('../controllers/receptionController');

router.post('/generate', receptionController.generate);
router.get('/list', receptionController.list);
router.post('/assign-doctor', receptionController.assign);
router.delete('/:id', receptionController.remove);

module.exports = router;
