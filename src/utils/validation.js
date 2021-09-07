const { body } = require('express-validator');


const userValidationRules = () => [
    body('username')
        .notEmpty().withMessage('username can NOT be blank!')
        .isAlphanumeric().withMessage('username must be Alphanumeric!'),
    body('password', 'Password must be at least 6 letters!').isLength({min: 6}),
    body('phone', 'Phone number must be at least 11 numbers').optional().isLength({min:11})
];

// const loginValidationRules = () => [
//     body('username').notEmpty().isAlphanumeric(),
//     body('password').isLength({min: 6})
// ];


module.exports = {
    userValidationRules,
    // loginValidationRules
}