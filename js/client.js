// import {io} from 'socket.io-client'
const socket = io("http://localhost:6060");
// console.log(socket)

const form = document.getElementById('send-container')
const messageInput =  document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')
const centerMessage = document.querySelector('.center-item')
let audio = new Audio('ting.mp3')

const appendJoinee = (message, position)=>{
    let newJoined = document.createElement('div');
    newJoined.innerText = message;
    newJoined.classList.add('joined-info')
    newJoined.classList.add(position)
    messageContainer.append(newJoined)
    audio.play()
}

const fname = prompt('Please enter your name to join')
socket.emit('new-user-joined', fname)


socket.on("user-joined", name=>{
    console.log("hey ya");
    appendJoinee(`${name} joined the chat`, 'center')
    console.log(centerMessage)
})

const appendMessage = (message, position)=>{
    let sendmessage = document.createElement('div');
    sendmessage.innerText = message;
    sendmessage.classList.add('message')
    sendmessage.classList.add(position)
    messageContainer.append(sendmessage)

    if(position === 'left'){
        audio.play()
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log('button pressed')
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = ''
})

socket.on("receive", data=>{
    appendMessage(`👤 ${data.fname}: ${data.message}`, 'left')
})

socket.on('left', data=>{
    appendJoinee(`${data} left the chat`, 'center')
})

socket.on('self-joined', message=>{
    appendJoinee(`You joined the chat`, 'center')
})