const jwt = require('jsonwebtoken');
const User = require('../models/User');


// POST /signup
const signup = async (req, res, next) => {
    try {
        const user = new User({...req.body});
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
        }, process.env.JWT_TOKEN_SECRET);

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