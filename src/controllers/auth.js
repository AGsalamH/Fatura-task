const jwt = require('jsonwebtoken');
const { Role, User, ROLES } = require('../models');


// POST /signup
const signup = async (req, res, next) => {
    const { username, password, phone, roles } = req.body;
    try {
        const user = new User({ username, password, phone });

        if (roles) { // roles sent in req.body ??
            const userRoles = await Role.find({name: {$in: roles}});
            user.roles = userRoles.map(role => role._id);
        } else {
            const userRole = await Role.findOne({name: 'user'});
            user.roles = [userRole._id];            
        }

        const savedUser = await user.save();
        
        res.status(201).json({
            ok: 1,
            user: savedUser
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// POST /login
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.userExist(username);
        await user.comparePasswords(password);

        // At this point everything is fine
        // Let's create JWT token
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_TOKEN_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        // Send token to client in response header
        res.setHeader('Authorization', token);
        res.json({
            ok: 1,
            msg: 'You are now loggedIn :)',
            token
        });

    } catch (error) {
        console.log(error);
        next(error);
    }    
}


module.exports = {
    signup,
    login
}