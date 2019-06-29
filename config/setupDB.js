const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('DB connected');
})
.catch(console.log);

module.exports = {}