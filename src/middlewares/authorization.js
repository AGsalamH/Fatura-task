const { User, ROLES } = require("../models");


/**
 * Middleware: Manages the Authorization
 * Checks if a user is allowed to access a certain route 
 * Compares the user.roles to the roles passed to the Middleware
 */
module.exports = (...roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                const error = new Error('User does NOT exist!!');
                error.statusCode = 404;
                throw error;
            }
            const isPermissionGranted = user.roles.some(role => roles.includes(role));
            if (!isPermissionGranted) { // user.roles NOT in roles
                const error = new Error('You are NOT Authorized!!');
                error.statusCode = 401;
                throw error;
            }
            next();
        } catch (error) {
            console.log(error);
            next(error);
        }  
    };
}