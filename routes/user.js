const { Router } = require('express');
const bodyParser = require('body-parser');
const {
    signUp,
    login,
    getFactorial,
} = require('../controllers/user');
const { asyncMiddleware } = require('../middlewares/errorHandler');

const jsonParser = bodyParser.json();

const router = Router();

router.post('/signup', jsonParser, asyncMiddleware(signUp));

router.post('/login', jsonParser, asyncMiddleware(login));

router.get('/fact/:num', getFactorial);

module.exports = router;