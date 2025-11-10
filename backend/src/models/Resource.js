const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  hobby: { type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, score: Number, comment: String }]
}, { timestamps: true });

ResourceSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Resource', ResourceSchema);
