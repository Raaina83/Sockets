const socket = io('ws://localhost:3500')

const msgInp = document.querySelector('#message')
const nameInp = document.querySelector('#name')
const chatRoom = document.querySelector('#room')
const activity = document.querySelector('.activity')
const userList = document.querySelector('.user-list')
const roomList = document.querySelector('.room-list')
const chatDisplay = document.querySelector('.chat-display')

function sendMessage(e) {
    e.preventDefault()
    if(nameInp.value && msgInp.value && chatRoom.value) {
        socket.emit("message", {
            name: nameInp.value,
            text: msgInp.value
        })
        msgInp.value = ""
    }
    msgInp.focus()
}

function enterRoom(e) {
    e.preventDefault()
    if(nameInp.value && chatRoom.value) {
        socket.emit("enterRoom", {
            name: nameInp.value,
            room: chatRoom.value
        })
    }
}

document.querySelector('.form-msg').addEventListener("submit", sendMessage)

document.querySelector('.form-join').addEventListener('submit', enterRoom)

msgInp.addEventListener("keypress", () => {
    socket.emit("activity", nameInp.value)
})

//Listen for messages
socket.on("message", (data) => {
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})


let activityTimer
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`
    clearTimeout(activityTimer)
    activityTimer = setInterval(() => {
        activity.textContent = ""
    }, 3000)
})