const router = require('express').Router();
const { signup, login } = require('../controllers/auth');
const validate = require('../middlewares/validate');
const { userValidationRules } = require('../utils/validation');
const verifyToken = require('../middlewares/verifyToken');
const authorization = require('../middlewares/authorization');


// POST /signup
router.post('/signup', userValidationRules(), validate, signup);

// POST /login
router.post('/login', login);


// Just for testing authorization
router.get('/test', verifyToken, authorization('user', 'admin'), (req, res) => res.json({msg: 'Authorized :)'}));

module.exports = router;