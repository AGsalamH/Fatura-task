const router = require('express').Router();
const authController = require('../controllers/auth');
const validate = require('../middlewares/validate');
const { userValidationRules, loginValidationRules, logoutValidationRules } = require('../utils/validation');

const { body } = require('express-validator');


// POST /api/auth/signup
router.post('/signup', userValidationRules(), validate, authController.signup);

// POST /api/auth/login
router.post('/login', loginValidationRules(), validate, authController.login);

// POST /api/auth/logout
router.post('/logout', logoutValidationRules(), validate, authController.logout);

// POST /api/auth/refresh-token
router.post('/refresh-token', body('refreshToken').notEmpty().isJWT(), validate, authController.refreshTokenHandler);

module.exports = router;