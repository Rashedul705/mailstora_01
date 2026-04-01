const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const ctrl    = require('../controllers/messageController');

// All routes require admin auth
router.post('/send',                    auth, ctrl.send);
router.get('/',                         auth, ctrl.getAll);
router.get('/schedule/:scheduleId',     auth, ctrl.getBySchedule);
router.delete('/:id',                   auth, ctrl.remove);

module.exports = router;
