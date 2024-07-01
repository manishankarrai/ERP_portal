const { registerSchema, loginSchema } = require('../utils/authValidation');

function validateRegister(req, res, next) {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(200).json({ error : 1 , message: error.details[0].message });
    }
    next();
}

function validateLogin(req, res, next) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(200).json({error : 1 , message: error.details[0].message });
    }
    next();
}

module.exports = {
    validateRegister,   validateLogin
};
