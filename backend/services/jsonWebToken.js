const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateUserToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }); 
};



module.exports = { generateUserToken  };
