const express = require('express');
const { createResource, getResourcesByHobby, rateResource } = require('../controllers/resourceController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.post('/', protect, createResource);
router.get('/hobby/:hobbyId', getResourcesByHobby);
router.post('/:id/rate', protect, rateResource);

module.exports = router;
