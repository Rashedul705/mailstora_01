const express = require('express');
const router = express.Router();
const controller = require('../controllers/contentController');

router.get('/hero', controller.getHero);
router.post('/hero', controller.createHero);
router.put('/hero/:id', controller.updateHero);
router.delete('/hero/:id', controller.deleteHero);

router.get('/website', controller.getContent);
router.post('/website', controller.createContent);
router.put('/website/:id', controller.updateContent);
router.delete('/website/:id', controller.deleteContent);

module.exports = router;
