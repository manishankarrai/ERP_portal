const { Inventory } = require('../../models/Inventory');
const { logger } = require('../../services/loggerService');

const getById = async (req, res) => {
    try {
        const { id } = req.body;

        const inventory =  await Inventory.findById(id);

        logger.info({
            message: ' success ',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: inventory, message: 'Success' });
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

        const inventory = await Inventory.find().sort({ createdAt: -1});
        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: inventory, message: 'Success' });
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
        const { product  , unit_type , unit_value , warehouse  } = req.body;

          const inventory = await  new Inventory({product  , unit_type , unit_value , warehouse  }).save();

        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: inventory, message: 'Success' });
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
        const { product  , unit_type , unit_value , warehouse  } = req.body;
        
        const inventoryStatus =  await Inventory.findOneAndUpdate({ _id: id } , { product  , unit_type , unit_value , warehouse});
         const inventory =  await Inventory.find().sort({ createdAt: -1});


        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: inventory, message: inventoryStatus });
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

        await Inventory.findByIdAndDelete(id);
        const inventory = await Inventory.find().sort({ createdAt: -1});


        logger.info({
            message: ' deleted',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: inventory, message: 'Success' });

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
