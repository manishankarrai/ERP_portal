const { logger } = require('../../services/loggerService');

const getById = async (req, res) => {
    try {
        const { id } = req.body;

        

        logger.info({
            message: ' success ',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: [], message: 'Success' });
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
        const { } = req.body;


        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: [], message: 'Success' });
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
        const { } = req.body;


        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: [], message: 'Success' });
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
        const { } = req.body;


        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: [], message: 'Success' });
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
        const { } = req.body;


        logger.info({
            message: ' created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: ''
        });
        res.status(200).json({ error: 0, data: [], message: 'Success' });
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
