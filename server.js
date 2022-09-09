


const express = require('express');
const cors = require('cors')
const app = express();
// for loggin in
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const { signedCookie } = require('cookie-parser');


const port = 8000;
require('./server/config/mongoose.config');


// for enviroiment varaibels
require('dotenv').config(); // this will allow access for all files using process.env.key!

// app.use(cors())
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// json api config
app.use(express.json());
app.use(express.json(), express.urlencoded({ extended: true }));

// extra files
const colors =  require('colors');
colors.enable();



// Routes for server
require('./server/routes/event.routes')(app); // This is new
require('./server/routes/user.routes')(app); // This is new




// creating connectioin, as well as socket
const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );
const io = require('socket.io')(server, { cors: true });

// socket connections
io.on("connection", (socket) => {
    // ! connection received
    console.log(colors.magenta(`<- user connected: ${socket.id}`));

    // emitters
    socket.emit("join", {type: "JOIN", content: "user joined", username: "someone"});

    // listerrs
    socket.on("chat", (data) => {
        // console.log(data);
        io.emit("chat", data);
    })

    socket.on("join", (data) => {
        console.log(data);
        // io.emit("chat", data);
    })

    // ! disconnected
    socket.on("disconnect", (reason) => {
        console.log(colors.red(`-> user disconnected: ${reason}`));
    });

})


