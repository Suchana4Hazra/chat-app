import React, { useEffect, useState } from 'react';
import { user } from "../Join/Join.jsx";
import socketIo from "socket.io-client";
import './chat.css';
import sendLogo from '../../images/send.png';
import Message from '../../component/Message/Message.jsx';
import ReactScrollBottom from 'react-scroll-to-bottom';
import closeIcon from '../../images/closeIcon.png';

const ENDPOINT = 'http://localhost:4500/';

let socket;

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
        const inputElement = document.getElementById('chatInput');
        const message = inputElement.value.trim(); // Trim to handle spaces
        if (message) { // Only send if message is not empty
            socket.emit('message', { message, id });
            inputElement.value = ""; // Clear input after sending

        }
        inputElement.focus(); // Refocus the input field
    };


    useEffect(() => {
        // Initialize the socket connection only once
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            console.log('Connected to server');
            setid(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message);
        });

        socket.on('userJoined', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message);
        });

        socket.on('leave', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message);
        });

        return () => {
            socket.off('welcome');
            socket.off('userJoined');
            socket.off('leave');
        };
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message, data.id);
        });

        return () => {
            socket.off('sendMessage');
        };
    }, []);

    return (
        <div className='chatPage'>
            <div className="chatContainer">
                <div className="header">
                    <h2>CHAT WORLD</h2>
                    <a href='./'> <img src={closeIcon} alt='Close' /> </a>
                </div>
                <ReactScrollBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message
                            key={i}
                            user={item.id === id ? "" : item.user}
                            message={item.message}
                            classs={item.id === id ? 'right' : 'left'}
                        />
                    ))}
                </ReactScrollBottom>

                <div className="inputBox">
                    <input
                        type="text"
                        id="chatInput"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') send();
                        }}
                    />
                    <button
                        onClick={send}
                        className="sendBtn">
                        <img src={sendLogo} alt="Send" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Chat;
