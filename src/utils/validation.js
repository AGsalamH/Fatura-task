const { body } = require('express-validator');
const { ROLES } = require('../models');


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

const loginValidationRules = () => [
    body('username')
        .notEmpty().withMessage('username can NOT be blank!')
        .isAlphanumeric().withMessage('username must be Alphanumeric!'),
    body('password')
        .notEmpty().withMessage('password can NOT be blank!')
        .isLength({min: 6}).withMessage('Password must be at least 6 letters!')
];


module.exports = {
    userValidationRules,
    loginValidationRules
}