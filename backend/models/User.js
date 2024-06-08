//backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  userProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  mobileNumber: { type: String },
  propertiesViewedCount: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

