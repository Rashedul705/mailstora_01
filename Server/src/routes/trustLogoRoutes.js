const express    = require('express');
const router     = express.Router();
const ctrl       = require('../controllers/trustLogoController');

// Settings (must come BEFORE /:id so "settings" isn't treated as an id)
router.get('/settings',    ctrl.getSettings);
router.patch('/settings',  ctrl.updateSettings);

// CRUD
router.get('/',         ctrl.getAll);
router.post('/',        ctrl.create);
router.patch('/:id',    ctrl.update);
router.delete('/:id',   ctrl.remove);

module.exports = router;
