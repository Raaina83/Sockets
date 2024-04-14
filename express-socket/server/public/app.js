const socket = io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const msgInp = document.querySelector('input')

function sendMessage(e) {
    e.preventDefault()
    if(msgInp.value) {
        socket.emit("message", msgInp.value)
        msgInp.value = ""
    }
    msgInp.focus()
}

document.querySelector('form').addEventListener("submit", sendMessage)

//Listen for messages
socket.on("message", (data) => {
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

msgInp.addEventListener("keypress", () => {
    socket.emit("activity", socket.id.substring(0,5))
})

let activityTimer
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`
    clearTimeout(activityTimer)
    activityTimer = setInterval(() => {
        activity.textContent = ""
    }, 3000)
})