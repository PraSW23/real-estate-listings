const mongoose = require('mongoose');
const Property = require('./models/Property');
const dotenv = require('dotenv');

dotenv.config();

const properties = [
  {
    title: 'Luxury Villa',
    description: 'A beautiful luxury villa with ocean views.',
    price: 2500000,
    location: 'Miami, FL',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Modern Apartment',
    description: 'A modern apartment in the city center.',
    price: 800000,
    location: 'New York, NY',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Cozy Cottage',
    description: 'A cozy cottage in the countryside.',
    price: 300000,
    location: 'Nashville, TN',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Seaside Mansion',
    description: 'A grand mansion overlooking the sea.',
    price: 5000000,
    location: 'Los Angeles, CA',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Rural Farmhouse',
    description: 'A farmhouse nestled in the countryside.',
    price: 600000,
    location: 'Kansas City, MO',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Penthouse Suite',
    description: 'A luxurious penthouse in the heart of the city.',
    price: 3500000,
    location: 'Chicago, IL',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Mountain Retreat',
    description: 'A serene retreat nestled in the mountains.',
    price: 900000,
    location: 'Denver, CO',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Historic Townhouse',
    description: 'A historic townhouse with modern amenities.',
    price: 1200000,
    location: 'Boston, MA',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Lakefront Cabin',
    description: 'A charming cabin with stunning views of the lake.',
    price: 400000,
    location: 'Seattle, WA',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'City Loft',
    description: 'A stylish loft apartment in the heart of downtown.',
    price: 700000,
    location: 'San Francisco, CA',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Beachfront Bungalow',
    description: 'A cozy bungalow right on the beach.',
    price: 1500000,
    location: 'San Diego, CA',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Suburban Family Home',
    description: 'A spacious family home in a quiet suburban neighborhood.',
    price: 1000000,
    location: 'Atlanta, GA',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Downtown Condo',
    description: 'A modern condo in the heart of the city.',
    price: 850000,
    location: 'Houston, TX',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Ski Chalet',
    description: 'A cozy chalet perfect for winter getaways.',
    price: 1800000,
    location: 'Aspen, CO',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
  },
  {
    title: 'Elegant Townhome',
    description: 'An elegant townhome with beautiful architecture.',
    price: 1100000,
    location: 'Portland, OR',
    image: 'https://via.placeholder.com/150',
    user: '6665372f3fdf7b35b593a381'
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
