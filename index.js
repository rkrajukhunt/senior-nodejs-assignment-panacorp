require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const { handler: errorHandler } = require('./middlewares/errorHandler');
require('./config/setupDB');

const app = express();

app.use(cors());

app.use('/user', userRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000');
})