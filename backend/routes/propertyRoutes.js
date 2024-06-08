//backend/routes/propertyRoutes.js
const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
    	 console.error('Error fetching properties:', error);
    	 res.status(500).json({ message: 'Server error' });
        res.status(500).json({ message: error.message });
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

// Add a new property
router.post('/', async (req, res) => {
    const property = new Property(req.body);
    try {
        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
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

module.exports = router;

