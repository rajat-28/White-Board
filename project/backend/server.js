const express = require("express");
const app=express()
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);
const {addUser, getUser, removeUser}=require('./utils/users')
app.get('/', (req, res) => {
    res.send("WhiteBoard");
});

let roomIdGlobal,imgURLGlobal;

io.on("connection", (socket) => {
    
    socket.on("userJoined", (data) => {      
        const { name, userId,roomId, host, presenter } = data;
        roomIdGlobal=roomId;
        socket.join(roomId);
        const users= addUser({ name, userId,roomId, host, presenter,socketId:socket.id });
        socket.emit("userIsJoined", { success: true,users });
        socket.broadcast.to(roomId).emit("userJoinedMessageBroadcasted",name)
        socket.broadcast.to(roomId).emit( "allUsers",users)
        io.to(roomId).emit("whiteBoardDataResponse",{
            imgURL:imgURLGlobal,
        })
        
    });
    socket.on("whiteboardData",(data)=>{
        imgURLGlobal=data;
        io.to(roomIdGlobal).emit("whiteBoardDataResponse",{
            imgURL:data
        })
    })
    socket.on("disconnect",()=>{
        const user=getUser(socket.id)
        
        if(user){
           removeUser(socket.id)
            socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadcasted",user.name)   
        }
        
    })

    
   
});

const port = process.env.PORT || 5000;
http.listen(port, () => console.log("Server Running"));
