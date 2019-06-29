const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { BusinessError } = require('../middlewares/errorHandler');
const factorialModule = require('../test-addon')

exports.signUp = async (req, res) => {
    const { password, } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userDoc = {
        ...req.body,
        password: hash,
    };
    res.send({
        status: 1,
        response: await User.create(userDoc),
    });
};

exports.login = async (req, res) => {
    const {
        userName,
        password,
    } = req.body;
    const userDoc = await User.findOne({ userName, });
    if(!userDoc) throw new BusinessError('No such user exists');
    const { password: hash } = userDoc;
    const isValid = await bcrypt.compare(password, hash);
    if(!isValid) throw new BusinessError('Invalid password');
    res.send({
        status: 1,
        response: userDoc,
    })
};

exports.getFactorial = async (req, res) => {
    const { num } = req.params;
    res.send({
        status: 1,
        response: factorialModule.fact(parseInt(num)),
    });
}
