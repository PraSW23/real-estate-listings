const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const payload = {
  user: {
    id: "6661c0c87bf2b063e4f2e935"
  }
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log(token);

