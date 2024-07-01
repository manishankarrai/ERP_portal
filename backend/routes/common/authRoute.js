const express  = require('express');
const router   =  express.Router();
const { register  , login } =  require('../../controllers/auth/userAuthController');
const {  validateRegister, validateLogin } = require('../../middlewares/validateAuth');


router.get('/test' , function(req , res){
      res.status(200).send({message: "working fine" , errro : 0  , data : null });
    });

router.post('/register' , validateRegister ,  register);
router.post('/login' ,  validateLogin , login);






module.exports =   router   ;