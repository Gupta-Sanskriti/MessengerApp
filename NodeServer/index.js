const cors = require("cors")
const io = require("socket.io")(6060, {
    cors:{
        origin:['http://127.0.0.1:5500'], //set this to client server
    },
})  

const users = {};
io.on("connection", (socket) =>{
    socket.on('new-user-joined', fname =>{
        users[socket.id] = fname;
        socket.broadcast.emit("user-joined", fname)
        socket.emit('self-joined', fname)
    })

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message:message, fname:users[socket.id]})
    })

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.io]
    })
})

