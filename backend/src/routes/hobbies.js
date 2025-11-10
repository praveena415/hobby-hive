const express = require('express');
const { createHobby, getHobbies, getHobby, updateHobby, deleteHobby } = require('../controllers/hobbyController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getHobbies);
router.post('/', protect, createHobby);
router.get('/:id', getHobby);
router.put('/:id', protect, updateHobby);
router.delete('/:id', protect, deleteHobby);

module.exports = router;
