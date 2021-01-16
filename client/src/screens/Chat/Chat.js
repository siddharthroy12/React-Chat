import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'
import InfoBar from './components/InfoBar/InfoBar'
import Input from './components/Input/Input'
import Messages from './components/Messages/Messages'
import TextContainer from './components/TextContainer/TextContainer'

let socket;

const Chat = ({ location, history }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io.connect('/', {'forceNew': true})

        setName(name)
        setRoom(room)
        
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
                history.push('/')
            }
        })

        return () => {
            socket.disconnect()
            socket.off()
        }
    },[location.search, history])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });
    }, [messages])

    // Send Message
    const sendMessage = message => {
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(users)

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}></InfoBar>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat