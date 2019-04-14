const { mongoose } = require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let app = express();

app.use(bodyParser.json());
app.use(cors());

const employeeController = require('./controllers/employeeController');
app.use('/employee', employeeController);

const User = require('./controllers/userController');
app.use('/user', User);


app.listen(3000, () => {
    console.log('Express server started at port: 3000')
});