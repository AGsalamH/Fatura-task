const router = require('express').Router();
const { ROLES } = require('../models');
const verifyToken = require('../middlewares/verifyToken');
const authorization = require('../middlewares/authorization');

/**
 * Endpoints to test the Authentication & Authorization
 */

router.get('/public', verifyToken, authorization(...ROLES), (req, res) => {
    res.json({message: 'Public content'});
});

router.get('/user', verifyToken, authorization('user'), (req, res) => {
    res.json({message: 'user content'});
});

router.get('/admin', verifyToken, authorization('admin'), (req, res) => {
    res.json({message: 'Admin content'});
});

router.get('/moderator', verifyToken, authorization('moderator'), (req, res) => {
    res.json({message: 'moderator content'});
});

module.exports = router;
