const { Product } = require('../../models/Product');
const { logger } = require('../../services/loggerService');

const getById = async (req, res) => {
    try {
        const { id } = req.body;

        const product =  await Product.findById(id);

        logger.info({
            message: ' success ',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: product, message: 'Success' });
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

        const product = await Product.find().sort({ createdAt: -1});
        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: product, message: 'Success' });
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
        const { name  , description , currency , purchage_price  , selling_price } = req.body;

          const product = await  new Product({ name  , description , currency , purchage_price  , selling_price  }).save();

        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: product, message: 'Success' });
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
        const { id , name  , description , currency , purchage_price  , selling_price } = req.body;

        
        const productStatus =  await Product.findOneAndUpdate({ _id: id } , { name  , description , currency , purchage_price  , selling_price });
         const product =  await Product.find().sort({ createdAt: -1});


        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: product, message: productStatus });
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

        await Product.findByIdAndDelete(id);
        const product =  await Product.find().sort({ createdAt: -1});

        logger.info({
            message: ' deleted',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: product, message: productStatus });

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
