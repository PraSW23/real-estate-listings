//backend/models/Property.js
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true }
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
