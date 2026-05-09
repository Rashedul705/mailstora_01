const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminPortfolioController');
const verifyToken = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.use(verifyToken);

router.get('/stats', controller.getStats);
router.post('/upload-image', upload.single('image'), controller.uploadImage);

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
