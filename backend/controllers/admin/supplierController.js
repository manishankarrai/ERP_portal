const { Supplier } = require('../../models/Supplier');
const { logger } = require('../../services/loggerService');

const getById = async (req, res) => {
    try {
        const { id } = req.body;

        const supplier =  await Supplier.findById(id);

        logger.info({
            message: ' success ',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: supplier, message: 'Success' });
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


const get = async (req, res) => {
    try {

        const supplier = await Supplier.find().sort({ createdAt: -1});
        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: supplier, message: 'Success' });
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


const store = async (req, res) => {
    try {
        const { name  , contact_info } = req.body;

          const supplier = await  new Supplier({name , contact_info }).save();

        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: supplier, message: 'Success' });
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
        const { id  , name  , contact_info} = req.body;
        
        const supplierStatus =  await Supplier.findOneAndUpdate({ _id: id } , { name , contact_info});
         const supplier =  await Supplier.find().sort({ createdAt: -1});


        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: supplier, message: supplierStatus });
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
        const {id } = req.body;

        await Supplier.findByIdAndDelete(id);
        const supplier = await Supplier.find().sort({ createdAt: -1});


        logger.info({
            message: ' deleted',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: supplier, message: 'Success' });

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
    get, getById ,store  , update  , destroy 

};
