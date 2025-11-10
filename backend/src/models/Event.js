const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  hobby: { type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: String,
  location: { type: { type: String, default:'Point' }, coordinates: [Number] },
  startAt: Date,
  endAt: Date,
  maxParticipants: Number,
  rsvps: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, status: { type: String, default: 'going' }, respondedAt: Date }]
}, { timestamps: true });

EventSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Event', EventSchema);
