const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models/User');

const secret = process.env.SECRET;

const authenticateUserToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
      return res.status(200).send({message: 'token missing , please login again'  , error : 1 });
  } 

  try {
    const decoded = jwt.verify(token, secret);
    //console.log(decoded);
    const user = await User.findById(decoded.id);
    
     // console.log("user in middleware  " , user  , decoded.name  , decoded.id);
    if (!user || user.name != decoded.name) {
      return res.status(200).send({message: 'credencial missing , please login again'  , error : 1 });
    }
    
    req.user = user;
    next();
  } catch (error) {

    return res.status(200).send({message: error.message  , error : 1 });

  }
};

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      //console.log("role is " , requiredRole , req.user.role);
      if (req.user.role !== requiredRole) {
        return res.status(200).send({error : 1 , message: 'Access denied. User have not right role' });
      }

      next();
    } catch (error) {
      res.status(200).send({error : 1 , message: 'Please authenticate.'+ error });
    }
  };
};


module.exports = { authenticateUserToken  ,  checkRole };
