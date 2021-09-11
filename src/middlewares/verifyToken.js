const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwtAuth');
const { BlackList } = require('../models');

/**
 * Middleware: Protect routes by checking if incoming requests has a valid token or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = async (req, res, next)=>{
    const token = req.get('Authorization');
    try {
        if(!token){
            const error = new jwt.JsonWebTokenError('Access-denied');
            error.statusCode = 401;
            throw error;
        }
        
        const isBlackListed = await BlackList.findOne({token});

        if (isBlackListed) {
            const error = new jwt.TokenExpiredError('This token is expired!');
            error.statusCode = 400;
            throw error;
        }
        
        const decodedData = jwt.verify(token, jwtConfig.ACCESS_TOKEN_SECRET);
        req.userId = decodedData._id;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}
