const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hobby: { type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  announcements: [{ text: String, author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, createdAt: Date }]
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);
