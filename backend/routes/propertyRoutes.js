//backend/routes/propertyRoutes.js
const express = require('express');
const Property = require('../models/Property');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all properties sorted by date (newest first)
router.get('/new', async (req, res) => {
    try {
        const properties = await Property.find().sort({ date: -1 }).populate('user', 'name');
        res.json(properties);
    } catch (error) {
        console.error('Error fetching new properties:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all properties with advanced search
router.get('/', async (req, res) => {
    const { query, description, location, owner, minPrice, maxPrice } = req.query;
    try {
        let searchCriteria = {};

        if (query) searchCriteria.title = new RegExp(query, 'i');
        if (description) searchCriteria.description = new RegExp(description, 'i');
        if (location) searchCriteria.location = new RegExp(location, 'i');
        if (owner) {
            const user = await User.findOne({ name: new RegExp(owner, 'i') });
            if (user) searchCriteria.user = user._id;
        }
        if (minPrice) searchCriteria.price = { ...searchCriteria.price, $gte: minPrice };
        if (maxPrice) searchCriteria.price = { ...searchCriteria.price, $lte: maxPrice };

        const properties = await Property.find(searchCriteria).populate('user', 'name');
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get a single property by ID
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('user','name');
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

router.delete('/:id', async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
        await User.updateMany(
            { favoriteProperties: req.params.id },
            { $pull: { favoriteProperties: req.params.id } }
        );
        res.json({ message: 'Property deleted and removed from favorites' });
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

// Get user properties
router.get('/user/:id', async (req, res) => {
    try {
        const properties = await Property.find({ user: req.params.id }).populate('user', 'name');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to add a new property
router.post('/', auth, async (req, res) => {
    
    try {

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


// Route to remove a favorite property from all users
router.post('/removeFavoriteProperty', async (req, res) => {
    const { propertyId } = req.body;
    try {
        await User.updateMany(
            { favoriteProperties: propertyId },
            { $pull: { favoriteProperties: propertyId } }
        );
        res.json({ message: 'Property removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
