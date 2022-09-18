import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import {LoggedinContext} from '../context/LoggedinContext';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useRef } from 'react';


const ChatroomPublic = ({beat}) => {
    const messageAreaRef = useRef(null);
    const navigate = useNavigate();

    const {roomId} = useParams();

    const {loggedinInfo,setLoggedinInfo} = useContext(LoggedinContext);
    const [loading, setLoading] = useState(true);

    const [socket] = useState(() => io(':8000'));
    const [message, setMessage] = useState({
        content : "",
        username : "",
        userId : "",
        type : "CHAT",
        roomId : roomId,
        time : "",
    });
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            // ! disconnect socket if you returning
            socket.disconnect(true);
            navigate('/login');
            setLoading(false);
            return;
        } 

        
        if (roomId) {
            socket.emit("joinRoom", {roomId: roomId});
        }


        if (loading) {
            if (loggedinInfo.loggedinUsername === null) {
                //we don't want do anything until finishing loading the user
                axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
                    .then(res => {
                        let tempedUsername = res.data.username;
                        // ! this takes care of case when user refreshes, and destroy username
                        setLoggedinInfo({ ...loggedinInfo, loggedinUsername: tempedUsername})
                        setLoading(false);
                        setMessage({ ...message, username: tempedUsername, userId : loggedinInfo.loggedinId  });
                        
                        // * let everyone knows that they joined
                        socket.emit("chat", {content : `${tempedUsername} joined`, username : tempedUsername, type : "JOIN", roomId : roomId, time : new Date(), userId : loggedinInfo?.loggedinId});

                    })
                    .finally(() => setLoading(false));
            } else {
                // ! this takes care of the case when the user loggin or reigster
                setLoading(false)
                setMessage({ ...message, username: loggedinInfo.loggedinUsername, userId : loggedinInfo.loggedinId});
                // * let everyone knows that they joined
                socket.emit("chat", { content: `${loggedinInfo.loggedinUsername} joined`, username: loggedinInfo.loggedinUsername, type: "JOIN", roomId : roomId, time : new Date(), userId : loggedinInfo?.loggedinId});
            }
        }



        // ! handle incomimg messages
            socket.on('chat', (data) => {
                
                setMessages(messages => {return [...messages, data]});

                if (data.type === "CHAT" && data.userId !== loggedinInfo.loggedinId) {
                    beat.play().catch();
                }
            })


        // ! disconnet is acting weired
        return function cleanup() {
            if (loggedinInfo.loggedinUsername) {
                socket.emit("chat", { content: `${loggedinInfo.loggedinUsername} left`, username: loggedinInfo.loggedinUsername, type: "LEAVE", roomId : roomId , time : new Date(), userId : loggedinInfo?.loggedinId});
            }
            else {
                socket.emit("chat", { content: `a user left`, username: null , type: "LEAVE", roomId : roomId , time : new Date(),  userId : loggedinInfo?.loggedinId});
            }
            socket.disconnect(true);
        }
    // eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (!loading) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const sendMessage = (e) => {
        e.preventDefault();

        // empty message or white space
        if (message.content.trim().length < 1) {
            return;
        }
        socket.emit('chat', {...message, time: new Date()});
        setMessage({...message, content: ""});

    };

    if (loading) {
        return (
            <div id="chat-page" className="d-flex align-items-center justify-content-center vh-100 w-100 styled-text text-white">
                <PropagateLoader width={100} color="white" loading={loading} cssOverride={{display: "block", margin: "0 auto", borderColor: "red", position : "fixed", top: "50%", left: "47%" }} />
            </div>
        )
    }

    else {
        return (

            <div id="chat-page" className="d-flex align-items-center justify-content-center vh-100 w-100 styled-text text-white">
                <div className="chat-container w-100 w-sm-75 w-lg-62 w-xxl-50 mt-5">

                    <div className="d-sm-flex justify-content-center align-items-center flex-column">
                        {/*  */}
                        <h2 id="chatroomName" className="text-center m-0">{roomId ? roomId : "Default Chatroom"}</h2>

                        <p className="text-success mb-1"><span id="number-connected">2</span> Online</p>
                    </div>

                    <ul id="messageArea" className="messageAreaPublic scroll-box" ref={messageAreaRef}>
                        {/* <li ref={topRef} className="btn" onClick={scrollToBottom}>Scroll To the Bottom</li> */}
                        {messages &&
                            messages.map((message, i) => {
                                return (
                                    (message.type === "CHAT") ? (
                                        <li className={`chat-message ${loggedinInfo.loggedinUsername === message.username ? 'sender' : 'receiver'}`} key={i}>
                                            <span>@{message.username}</span>
                                            <p className="">{message.content}</p>
                                            <p className="timestamp text-form">{new Date(message.time).toLocaleTimeString('en', { timeStyle: 'short', hour12: true, timeZone: 'America/Los_Angeles' })}</p>
                                        </li>
                                    ) : (
                                        <li className={"chat-message"} key={i}>
                                            <p className=""> {message.username ? <>@</> : <></>}{message.content}</p>
                                        </li>
                                    )
                                )
                            })}
                        {/* <li ref={bottomRef} className="btn" onClick={scrollToTop}>Scroll To the Top</li> */}

                    </ul>

                    {/* This might throw you an error
                <form id="messageForm" name="messageForm" nameForm="messageForm"> */}
                    <div className="messageFormArea">
                        {loading ?
                            <PropagateLoader /> :
                            <form id="messageForm" name="messageForm">
                                <div className="form-group mx-3">
                                    <div className="input-group text-center">
                                        <input
                                            type="text"
                                            id="message"
                                            placeholder="Type a message..."
                                            autoComplete="off"
                                            className="form-control"
                                            value={message.content}
                                            onChange={(e) => setMessage({ ...message, content: e.target.value })}
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
}

export default ChatroomPublic;