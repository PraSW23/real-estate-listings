const mongoose = require('mongoose');
const Property = require('./models/Property'); // Adjust the path if necessary
const dotenv = require('dotenv');

dotenv.config();

const properties = [
  {
    title: 'Luxury Villa',
    description: 'A beautiful luxury villa with ocean views.',
    price: 2500000,
    location: 'Miami, FL',
    image: 'https://via.placeholder.com/150'
  },
  {
    title: 'Modern Apartment',
    description: 'A modern apartment in the city center.',
    price: 800000,
    location: 'New York, NY',
    image: 'https://via.placeholder.com/150'
  },
  {
    title: 'Cozy Cottage',
    description: 'A cozy cottage in the countryside.',
    price: 300000,
    location: 'Nashville, TN',
    image: 'https://via.placeholder.com/150'
  }
];

const insertSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Property.deleteMany({}); // Clear existing properties
    await Property.insertMany(properties);

    console.log('Sample data inserted successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting sample data:', error);
    mongoose.connection.close();
  }
};

insertSampleData();

