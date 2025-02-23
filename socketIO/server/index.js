const {createServer} = require('http')
const {Server} = require("socket.io")

const httpServer = createServer()

const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
    socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.toString().substring(0,5)}: ${data}`)
    })
})

httpServer.listen(3500, () => console.log('app is listening on port 3500'))