const jwt = require('jsonwebtoken');


module.exports = async (req, res, next)=>{
    const token = req.get('Authorization');
    try {
        if(!token){
            const error = new jwt.JsonWebTokenError('Access-denied');
            error.statusCode = 401;
            throw error;
        }
        const decodedData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.userId = decodedData._id;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}