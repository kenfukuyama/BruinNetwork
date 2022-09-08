import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import {LoggedinContext} from '../context/LoggedinContext';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useRef } from 'react';


const Chatroom = () => {
    const bottomRef = useRef(null);
    const topRef = useRef(null);
    const messageAreaRef = useRef(null);
    const navigate = useNavigate();

    
    // const [loaded, setLoaded] = useState(false);
    const {loggedinInfo,setLoggedinInfo} = useContext(LoggedinContext);
    const [loading, setLoading] = useState(true);

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

        if (loading) {
            if (loggedinInfo.loggedinUsername === null) {
                //we don't want do anything until finishing loading the user
                axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
                    .then(res => {
                        // console.log(res);
                        let tempedUsername = res.data.username;
                        // console.log(tempedUsername);
                        setLoggedinInfo({ ...loggedinInfo, loggedinUsername: tempedUsername })
                        setLoading(false);
                        setMessage({ ...message, username: tempedUsername });
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(false)
                setMessage({ ...message, username: loggedinInfo.loggedinUsername });
            }
        }

        // we need to set up all of our event listeners
        // in the useEffect callback function


        // handle join event
        socket.on('join', data => console.log(data));

        socket.on('chat', (data) => {
            // console.log(data);
            setMessages([...messages, data]);
            // let messageArea = document.querySelector('#message-area');
            // messageArea.scrollTop = messageArea.bottomRef.current.scrollTop;
            // bottomRef.current?.innerHTML("hey");
            // console.log(bottomRef.current.innerHTML);
            // bottomRef.current.innerHTML() a
            
        })
        // bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        // console.log(bottomRef);
        // bottomRef.current?.innerHTML = "hello world";
        messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;

        // bottomRef.current?.innerHTML = "hello";
        // note that we're returning a callback function
        // this ensures that the underlying socket will be closed if App is unmounted
        // this would be more critical if we were creating the socket in a subcomponent
        // ! disconnet is acting weird
        // return () => socket.disconnect(true);
    // eslint-disable-next-line
    }, [messages]);

    const scrollToTop = () => {
        // messageAreaRef.current.scrollBottom = messageAreaRef.current.scrollHeight;
        topRef.current?.scrollIntoView({behavior: 'smooth'});
    };
    const scrollToBottom = () => {
        // messageAreaRef.current.scrollBottom = messageAreaRef.current.scrollHeight;
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    };


    const sendMessage = (e) => {
        e.preventDefault();
        // console.log(message);

        socket.emit('chat', message);
        setMessage({...message, content: ""});

    };

    return (

        <div id="chat-page" className="d-flex align-items-center justify-content-center vh-100 w-100 styled-text text-white">
            <div className="chat-container w-100 w-sm-75 w-lg-62 w-xxl-50 mt-5">

                <div className="d-none d-sm-flex justify-content-center align-items-center flex-column">
                {/*  */}
                            <h2 id="chatroomName" className="text-center m-0">Chatroom</h2>

                    <p className="text-success mb-1"><span id="number-connected">0</span> Online</p>
                </div>

                {/* <div className="connecting">Connecting...</div> */}

                <ul id="messageArea" className="messageAreaPublic" ref={messageAreaRef}>
                    {/* <li ref={topRef} className="btn" onClick={scrollToBottom}>Scroll To the Bottom</li> */}
                    {messages && 
                    messages.map((message, i) => {
                        return (
                            <li className={`chat-message ${loggedinInfo.loggedinUsername === message.username ? 'sender' : 'receiver'}`} key={i}>
                                <span>@{message.username}</span>
                                <p className="mb-0">{message.content}</p>
                            </li>
                            

                        ) 
                    })}
                    {/* <li ref={bottomRef} className="btn" onClick={scrollToTop}>Scroll To the Top</li> */}

                </ul>

{/* This might throw you an error
                <form id="messageForm" name="messageForm" nameForm="messageForm"> */}
                <div className="messageFormArea">
                    {loading ? 
                        <PropagateLoader/> :
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
                    }
                </div>

                
            </div>
        </div>
    )
}

export default Chatroom;