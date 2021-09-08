const router = require('express').Router();
const { signup, login } = require('../controllers/auth');
const validate = require('../middlewares/validate');
const { userValidationRules, loginValidationRules } = require('../utils/validation');


// POST /signup
router.post('/signup', userValidationRules(), validate, signup);

// POST /login
router.post('/login', loginValidationRules(), validate, login);


module.exports = router;