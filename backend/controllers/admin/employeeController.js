const { logger } = require('../../services/loggerService');
const { User  }  =  require('../../models/User');
const { hashPassword   }  =  require('../../services/argon2Hash');


const getById = async (req, res) => {
    try {
        const { id } = req.body;
        const user   =  await User.findById(id).select('-password -isDeleted');
        
        logger.info({
            message: ' success ',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: user , message: 'Success' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(200).json({ error: 1, message:  error.message, data: null });
    }
}


const get = async (req, res) => {
    try {
        const user =  await User.find().sort({ createdAt : -1});

        logger.info({
            message: 'find',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: user , message: 'Success' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(200).json({ error: 1, message: error.message , data: null });
    }
}


const store = async (req, res) => {
    try {
        const { name  , email , password  , role  } = req.body;

        const hashedPassword = await hashPassword(password);

        const user       =  await new User({name , email , password : hashedPassword , role }).save();
        const userData   =  await User.findById(user._id).select('-password -isDeleted');

        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: userData , message: 'Success' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(200).json({ error: 1, message: error.message, data: null });
    }
}


const update = async (req, res) => {
    try {
        const { id ,  name  , email , password  , role  } = req.body;
        if(password) {
          const hashedPassword = await hashPassword(password);
             await User.findOneAndUpdate({ _id : id } , { name  , email  , password : hashedPassword , role });    
        } else {
            //console.log("else work in update");
             await User.findOneAndUpdate({ _id : id } , { name  , email   , role });    
        }        
        //const userData   =  await User.findById(id).select('-password -isDeleted');
        const userData =  await User.find().sort({ createdAt : -1});


        logger.info({
            message: ' updated',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        // res.redirect('/admin/employee');
        res.status(200).json({ error: 0, data: userData, message: 'Success' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(200).json({ error: 1, message: error.message, data: null });
    }
}


const destroy = async (req, res) => {
    try {

         const { id } = req.body;
          await User.findOneAndUpdate({_id : id } , { isDeleted: true });
          const userData =  await User.find().sort({ createdAt : -1});


        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: userData, message: 'Success' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(200).json({ error: 1, message: error.message, data: null });
    }
}


module.exports = {
    get, getById  ,store  , update  , destroy 
};
