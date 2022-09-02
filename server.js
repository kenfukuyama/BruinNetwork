
const express = require('express');
const cors = require('cors')
const app = express();

const port = 8000;
require('./server/config/mongoose.config');


app.use(cors()) 
app.use(express.json());
app.use(express.json(), express.urlencoded({ extended: true }));

// Routes for server
require('./server/routes/event.routes')(app); // This is new
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );