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
// json api config
app.use(express.json());
app.use(express.json(), express.urlencoded({ extended: true }));

// extra files
const colors =  require('colors');
colors.enable();



// Routes for server
require('./server/routes/event.routes')(app); 
require('./server/routes/user.routes')(app); 
require('./server/routes/chitchat.routes')(app); 
require('./server/routes/friendship.routes')(app); 
require('./server/routes/bot.routes')(app); 




// creating connectioin, as well as socket
const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );
const io = require('socket.io')(server, { cors: true });



// let queueObject = require('/data/chitchatQueue');



// socket connections
io.on("connection", (socket) => {
    // ! connection received
    console.log(colors.magenta(`<- user connected: ${socket.id}`));

    // emitters
    // socket.emit("chat", {type: "JOIN", content: "user joined", username: "someone"});

    // ! listeners
    // * for the chat to spcific room (include join, chat, leave events)
    socket.on("chat", (data) => {
        // console.log(data);

        // this emits to all
        // io.emit("chat", data);
        io.to(data.roomId).emit("chat", data);

        if (data.type === "LEAVE") {
            const clients = io.sockets.adapter.rooms.get(data.roomId);
            const onlineNumber = clients ? clients.size-1 : 0;
            console.log(onlineNumber-1);
            io.to(data.roomId).emit("onlineNumberUpdate", {onlineNumber : onlineNumber});
            
        }
    })

    // * for joining the rooms to specific room
    socket.on("joinRoom", (data) => {
        // console.log(data);
        // io.emit("chat", data);
        socket.join(data.roomId);
        const clients = io.sockets.adapter.rooms.get(data.roomId);
        const onlineNumber = clients ? clients.size : 0;
        io.to(data.roomId).emit("onlineNumberUpdate", {onlineNumber : onlineNumber});
        console.log(socket.rooms);
    })
    
    // ! disconnected
    socket.on("disconnect", (reason) => {
        console.log(colors.red(`-> user disconnected: ${socket.id} - ${reason}`));
        
    });

})


// googleAssistant.promptUser();
// googleAssistant.getResponse("hello there!");
