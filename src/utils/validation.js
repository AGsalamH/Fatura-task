const { body } = require('express-validator');
const { ROLES } = require('../models');


/**
 * Validation used when registering a new user
 * @returns {*} validationChain
 */

const userValidationRules = () => [
    body('username')
        .notEmpty().withMessage('username can NOT be blank!')
        .isAlphanumeric().withMessage('username must be Alphanumeric!'),
    body('password')
        .notEmpty().withMessage('password can NOT be blank!')
        .isLength({min: 6}).withMessage('Password must be at least 6 letters!'),
    body('phone', 'Phone number must be at least 11 numbers').optional().isLength({min:11}),
    body('roles')
        .optional()
        .isArray().withMessage('Should be array of valid roles')
        .custom((value, { req }) => {
            const rolesExist = value.every(role => ROLES.includes(role));
            if (rolesExist) {
                return true;
            }
            throw new Error(`Failed! Invalid role assigned!!`)
        })
];


/**
 * Validation used to login a user
 * @returns {*} validationChain
 */
const loginValidationRules = () => [
    body('username')
        .notEmpty().withMessage('username can NOT be blank!')
        .isAlphanumeric().withMessage('username must be Alphanumeric!'),
    body('password')
        .notEmpty().withMessage('password can NOT be blank!')
        .isLength({min: 6}).withMessage('Password must be at least 6 letters!')
];


/**
 * Validation the incoming tokens in order to logout the user
 * @returns {*} validationChain
 */
const logoutValidationRules = () => [
    body('accessToken')
        .notEmpty().withMessage('accessToken is required!')
        .isJWT().withMessage('Invalid JWT token format!'),
    body('accessToken')
        .notEmpty().withMessage('refreshToken Is required!')
        .isJWT().withMessage('Invalid JWT token format!')
];


module.exports = {
    userValidationRules,
    loginValidationRules,
    logoutValidationRules
}