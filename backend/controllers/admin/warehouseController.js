const { Warehouse } = require('../../models/Warehouse');
const { logger } = require('../../services/loggerService');

const getById = async (req, res) => {
    try {
        const { id } = req.body;

        const warehouse =  await Warehouse.findById(id);

        logger.info({
            message: ' success ',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: warehouse, message: 'Success' });
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

        const warehouse = await Warehouse.find().sort({ createdAt: -1});
        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: warehouse, message: 'Success' });
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
        const { name  , location } = req.body;

          const warehouse = await  new Warehouse({name , location }).save();

        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: warehouse, message: 'Success' });
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
        const { id  , name  , location} = req.body;
        
        const warehouseStatus =  await Warehouse.findOneAndUpdate({ _id: id } , { name , location});
         const warehouse =  await Warehouse.find().sort({ createdAt: -1});


        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: warehouse, message: warehouseStatus });
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

        await Warehouse.findByIdAndDelete(id);
        const warehouse =  await Warehouse.find().sort({ createdAt: -1});


        logger.info({
            message: ' deleted',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });

        res.status(200).json({ error: 0, data: warehouse, message: warehouseStatus });

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
