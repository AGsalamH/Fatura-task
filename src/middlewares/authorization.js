const { User, Role } = require("../models");

module.exports = (...roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId).populate('roles');
            if (!user) {
                const error = new Error('User does NOT exist!!');
                error.statusCode = 404;
                throw error;
            }
            const isPermissionGranted = user.roles.some(role => roles.includes(role.name));
            if (!isPermissionGranted) { // user.roles != roles
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