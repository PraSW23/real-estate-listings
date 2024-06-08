//backend/routes/propertyRoutes.js
const express = require('express');
const Property = require('../models/Property');
const router = express.Router();
const auth = require('../middleware/auth');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single property by ID
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a property
router.put('/:id', async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
        res.json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a property
router.delete('/:id', async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
        res.json({ message: 'Property deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get properties by IDs
router.post('/getPropertiesByIds', async (req, res) => {
    const { propertyIds } = req.body;
    try {
        const properties = await Property.find({ _id: { $in: propertyIds } });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const properties = await Property.find({ user: req.params.id });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to add a new property
router.post('/', auth, async (req, res) => {
    console.log('Add property route hit');
    //const { title, description, price, location } = req.body; // Changed 'address' to 'location'
    //console.log(req.body);
    try {
        console.log('Request Headers:', req.headers); // Log headers
        console.log('Request Body:', req.body); // Log body

        const { image, title, description, price, location } = req.body;

        const newProperty = new Property({
            image,
            title,
            description,
            price,
            location,
            user: req.user.id,
        });
        const savedProperty = await newProperty.save();
        res.json(savedProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
