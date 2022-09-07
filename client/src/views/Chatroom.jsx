import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import {LoggedinContext} from '../context/LoggedinContext';

const Chatroom = () => {
    const navigate = useNavigate();

    
    // const [loaded, setLoaded] = useState(false);
    const {loggedinInfo} = useContext(LoggedinContext);

    // notice that we pass a callback function to initialize the socket
    // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
    const [socket] = useState(() => io(':8000'));
    const [message, setMessage] = useState({
        content : "",
        username : "ken",
        type : "CHAT"
    });
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        } 
        // we need to set up all of our event listeners
        // in the useEffect callback function


        // handle join event
        socket.on('join', data => console.log(data));

        socket.on('chat', (data) => {
            console.log(data);
            setMessages([...messages, data]);
        })


        // note that we're returning a callback function
        // this ensures that the underlying socket will be closed if App is unmounted
        // this would be more critical if we were creating the socket in a subcomponent
        // ! disconnet is acting weird
        // return () => socket.disconnect(true);
    });

    const sendMessage = (e) => {
        e.preventDefault();
        // console.log(message);

        socket.emit('chat', message);
        setMessage({...message, content: ""});

    };

    return (

        <div id="chat-page" className="fade-in d-flex align-items-center justify-content-center vh-100 w-100 styled-text text-white">
            <div className="chat-container w-100 w-sm-75 w-lg-62 w-xxl-50 mt-5">

                <div className="d-none d-sm-flex justify-content-center align-items-center flex-column">
                            <h2 id="chatroomName" className="text-center m-0">Chatroom</h2>

                    <p className="text-success mb-1"><span id="number-connected">0</span> Online</p>
                </div>

                {/* <div className="connecting">Connecting...</div> */}

                <ul id="messageArea" className="messageAreaPublic">
                    {messages && 
                    messages.map((message, i) => {
                        return (
                            <li className="chat-message sender" key={i}>
                                <span>{message.username}</span>
                                <p className="mb-0">{message.content}</p>
                            </li>
                        ) 
                    })}
                </ul>

{/* This might throw you an error
                <form id="messageForm" name="messageForm" nameForm="messageForm"> */}
                <form id="messageForm" name="messageForm">
                    <div className="form-group mx-3">
                        <div className="input-group text-center">
                            <input 
                            type="text" 
                            id="message" 
                            placeholder="Type a message..." 
                            autoComplete="off" 
                            className="form-control"
                            value = {message.content}
                            onChange = {(e) => setMessage({...message, content: e.target.value})}
                            />
                            <button className="btn btn-primary btn-lg" onClick={sendMessage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chatroom;