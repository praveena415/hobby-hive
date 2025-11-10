const mongoose = require('mongoose');

const HobbySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  skillLevel: { type: String, enum: ['Beginner','Intermediate','Advanced'], default: 'Beginner' },
  tags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

HobbySchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Hobby', HobbySchema);
