const jwt = require('jsonwebtoken');

const { User, RefreshToken, BlackList } = require('../models');
const jwtConfig = require('../../config/jwtAuth');

const { authenticate } = require('../utils/auth');
const { 
    generateAccessToken, 
    generateRefreshToken, 
    validateRefreshToken, 
    blackListToken 
} = require('../utils/jwtTokens');


// POST /signup
const signup = async (req, res, next) => {
    const { username, password, phone, roles } = req.body;
    try {
        const user = new User({ username, password, phone });

        if (roles) { // roles sent in req.body ??
            user.roles = roles;
        }
        const savedUser = await user.save();
        
        res.status(201).json({
            ok: 1,
            user: savedUser
        });
    } catch (error) {
        next(error);
    }
}


// POST /login
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await authenticate(username, password); // Check if username and password matches

        // At this point user is authenticated
        // Let's create JWT tokens
        const accessToken = generateAccessToken(user._id);
        // If there is any refresh token exists delete them before creating new one
        await RefreshToken.deleteMany({userId: user._id});
        const refreshToken = await generateRefreshToken(user._id);
        
        // Send token to client in response header
        res.setHeader('Authorization', accessToken);
        res.json({
            ok: 1,
            accessToken,
            refreshToken: refreshToken.token
        });

    } catch (error) {
        next(error);
    }    
}


const logout = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.body;
        
        const refreshTokenObj = await validateRefreshToken(refreshToken);
        await refreshTokenObj.deleteOne();
        await blackListToken(accessToken);
        res.status(204).json({message: 'Logged out!'});
    } catch (error) {
        next(error);
    }
};


const refreshTokenHandler = async (req, res, next) => {
    const { refreshToken } = req.body;
    try {
        const refreshTokenObj = await validateRefreshToken(refreshToken);
        const accessToken = generateAccessToken(refreshTokenObj.userId);
        res.json({ accessToken });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    signup,
    login,
    logout,
    refreshTokenHandler
}
