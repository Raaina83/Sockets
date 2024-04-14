const express = require('express')
const {Server} = require("socket.io")
const path = require('path')


const PORT = process.env.PORT || 3500

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    //Upon connection- only to user
    socket.emit("message", "Welcome to chat app")

    //Upon connection- to all other users
    socket.broadcast.emit("message", `User ${socket.id.substring(0,5)} connected!`)
    
    //Listen for messages
    socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`)
    })

    socket.on("activity", (name) => {
        socket.broadcast.emit('activity', name)
    })

    //When users disconnects
    socket.on("disconnect", () => {
        socket.broadcast.emit("message", `User ${socket.id.substring(0,5)} disconnected!`)
    })
})
