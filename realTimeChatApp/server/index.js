const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= process.env.PORT || 4500;


const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          socket.broadcast.emit('userJoined',{user:`${users[socket.id]}`,message:` has joined`});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `});
    })

    socket.on('message',({message, id}) => {
        io.emit('sendMessage', {user:users[id],message,id});
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:`${users[socket.id]}`,message:"has left"});
        console.log(`user left`);
    })
});


server.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})