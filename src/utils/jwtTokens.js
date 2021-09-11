const jwt = require('jsonwebtoken');
const { RefreshToken, BlackList } = require('../models');
const jwtConfig = require('../../config/jwtAuth');


/**
 * Generates new jwt AccessToken
 * Using some secret
 * expires after 10 mins
 * @param {userId} userId User object ID
 * @returns {*} jwtAccessToken jwt token
 */
const generateAccessToken = (userId) => {
    const token = jwt.sign({
        _id: userId
    }, jwtConfig.ACCESS_TOKEN_SECRET, {
        expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRATION // 10 mins
    });
    return token;
}


/**
 * Generates new jwt RefreshToken.
 * Save it to DB.
 * Used to generate new access token.
 * expires after 1 week
 * @param {UserId} userId User object ID
 * @returns jwtRefreshToken
 */
 const generateRefreshToken = async (userId) => {
    const token = jwt.sign({
        _id: userId
    }, jwtConfig.REFRESH_TOKEN_SECRET, {
        expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRATION // 1 week
    });

    const refreshToken = new RefreshToken({  token, userId });
    const savedToken = await refreshToken.save();

    return savedToken;
}


/**
 * Blocks an access token from loggin in again
 * @param {jwtToken} accessToken 
 * @returns {*} blackListedToken
 */
const blackListToken = async (accessToken) => {
    const blackListedToken  = new BlackList({ token: accessToken });
    await blackListedToken.save();
    return blackListedToken;
};


/**
 * Checks if there is a refreshToken matches the one sent in req.body.
 * 
 * @param {token} token refresh token sent in req.body
 * @returns {*} refreshToken RefreshToken object from mongoDB
 */
const validateRefreshToken = async (token) => {
    const decodedToken = jwt.verify(token, jwtConfig.REFRESH_TOKEN_SECRET);
    const refreshToken = await RefreshToken.findOne({userId: decodedToken._id});

    if(!refreshToken || token !== refreshToken.token) {
        const error = new Error('Refresh token expired!');
        error.statusCode = 400;
        throw error;
    }

    return refreshToken;
};


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    blackListToken,
    validateRefreshToken
}