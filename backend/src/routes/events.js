const express = require('express');
const { createEvent, getEvents, getEvent, rsvp } = require('../controllers/eventController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getEvents);
router.post('/', protect, createEvent);
router.get('/:id', getEvent);
router.post('/:id/rsvp', protect, rsvp);

module.exports = router;
