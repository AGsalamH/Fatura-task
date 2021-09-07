const router = require('express').Router();
const { signup, login } = require('../controllers/auth');
const validate = require('../middlewares/validate');
const { userValidationRules } = require('../utils/validation');


// POST /signup
router.post('/signup', userValidationRules(), validate, signup);

// POST /login
router.post('/login', login);

module.exports = router;