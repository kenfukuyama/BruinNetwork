
const express = require('express');
const cors = require('cors')
const app = express();
// for loggin in
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const port = 8000;
require('./server/config/mongoose.config');


// for enviroiment varaibels
require('dotenv').config(); // this will allow access for all files using process.env.key!


// app.use(cors()) 
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.json(), express.urlencoded({ extended: true }));

// Routes for server
require('./server/routes/event.routes')(app); // This is new
require('./server/routes/user.routes')(app); // This is new
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );