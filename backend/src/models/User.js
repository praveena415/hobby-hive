const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  profilePicUrl: String,
  bio: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] }
  },
  hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' }],
  skills: [String],
  points: { type: Number, default: 0 },
  badges: [{ name: String, awardedAt: Date }],
  role: { type: String, enum:['user','admin'], default:'user' }
}, { timestamps: true });

UserSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);
