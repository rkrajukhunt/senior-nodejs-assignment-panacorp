const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.index({
    userName: 1,
}, {
    unique: true,
})

module.exports = mongoose.model('User', userSchema);