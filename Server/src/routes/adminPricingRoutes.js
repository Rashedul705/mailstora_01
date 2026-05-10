const express = require('express');
const router = express.Router();
const controller = require('../controllers/pricingController');

router.get('/', controller.getAllAdmin);
router.post('/', controller.createPackage);
router.put('/:id', controller.updatePackage);
router.delete('/:id', controller.deletePackage);
router.patch('/:id/toggle', controller.toggleVisibility);
router.patch('/settings/update', controller.updateSettings);
router.post('/reorder', controller.reorderPackages);

module.exports = router;
