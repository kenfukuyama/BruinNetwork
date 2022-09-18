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
const { application, response } = require('express');
colors.enable();



// ! Routes for server
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
        socket.username = data.username;
        // console.log(socket.username);
        io.to(data.roomId).emit("chat", data);
    })

    // * for joining the rooms to specific room
    socket.on("joinRoom", (data) => {
        // console.log(data);
        // io.emit("chat", data);
        socket.join(data.roomId);
        const clients = io.sockets.adapter.rooms.get(data.roomId);
        const onlineNumber = clients ? clients.size : 0;
        io.to(data.roomId).emit("onlineNumberUpdate", {onlineNumber : onlineNumber});
        // console.log(socket.rooms);
        // console.log(io.sockets.adapter.rooms);
    })
    
    // ! disconnected

    // ! we will update all the users abou the change
    socket.on("disconnecting", (reason) => {
        console.log("disconnecting");
        // console.log(socket.rooms);
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                const clients = io.sockets.adapter.rooms.get(room);
                const onlineNumber = clients ? clients.size-1 : 0;
                // console.log(onlineNumber);
                const leftData = { content: `${socket.username} left`, username: socket.username, type: "LEAVE", roomId : room , time : new Date()}
                io.to(room).emit("chat", leftData);
                io.to(room).emit("onlineNumberUpdate", {onlineNumber : onlineNumber});
            }
        }
    });
    socket.on("disconnect", (reason) => {
        console.log(colors.red(`-> user disconnected: ${socket.id} - ${reason}`));
        // console.log(socket.rooms);
        
    });

})


const getOnlineNumber = (request, response) => {
    // console.log(io.sockets.adapter.rooms);
    // console.log("ran");
    let onlineObj = {}
    for (const room of io.sockets.adapter.rooms) {
        // console.log(room);
        onlineObj[room[0]] = room[1].size
    }
    // console.log(onlineObj);
    response.status(200).json(onlineObj);

};

// module.exports = {getOnlineNumber};

app.post('/api/chatrooms/online-number/all', getOnlineNumber);

// googleAssistant.promptUser();
// googleAssistant.getResponse("hello there!");
