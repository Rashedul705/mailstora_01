const express = require('express');
const router = express.Router();
const controller = require('../controllers/quoteController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.updateStatus);
router.post('/:id/reply', controller.reply);
router.delete('/:id', controller.remove);

module.exports = router;
