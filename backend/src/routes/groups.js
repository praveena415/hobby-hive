const express = require('express');
const { createGroup, getGroup, joinGroup, leaveGroup } = require('../controllers/groupController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.post('/', protect, createGroup);
router.get('/:id', getGroup);
router.post('/:id/join', protect, joinGroup);
router.post('/:id/leave', protect, leaveGroup);

module.exports = router;
