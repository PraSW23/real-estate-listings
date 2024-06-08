//backend/models/Property.js
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    image: { type: String, default: 'https://via.placeholder.com/150' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
