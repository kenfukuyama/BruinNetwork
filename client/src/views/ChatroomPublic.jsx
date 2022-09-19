import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import {LoggedinContext} from '../context/LoggedinContext';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useRef } from 'react';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { blue} from '@mui/material/colors';

import AvatarIcon from '../components/AvatarIcon';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


// users
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const ChatroomPublic = ({beat}) => {
    const messageAreaRef = useRef(null);
    const navigate = useNavigate();

    const {roomId} = useParams();
    const [onlineNumber, setOnlineNumber] = useState(10);


    const {loggedinInfo,setLoggedinInfo} = useContext(LoggedinContext);

    const [user, setUser] = useState(null);

    const [chatUsers, setChatUsers] = useState(null);
    const [none, setNone] = useState("none");
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


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    const StyledAvatorGroup = styled(AvatarGroup)(({ theme }) => ({
        '& .css-sxh3gq-MuiAvatar-root-MuiAvatarGroup-avatar': {
            backgroundColor: blue[500],
            // border : '0px'
        }

    }));



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
            // if (loggedinInfo.loggedinUsername === null) {
                //we don't want do anything until finishing loading the user
            axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
                .then(res => {
                    let tempedUsername = res.data.username;
                    setUser(res.data);
                    // ! this takes care of case when user refreshes, and destroy username
                    setLoggedinInfo({ ...loggedinInfo, loggedinUsername: tempedUsername})
                    setLoading(false);
                    setMessage({ ...message, username: tempedUsername, userId : loggedinInfo.loggedinId  });
                    
                    // * let everyone knows that they joined
                    socket.emit("chat", {content : `${tempedUsername} joined`, username : tempedUsername, type : "JOIN", roomId : roomId, time : new Date(), userId : loggedinInfo?.loggedinId});

            })
            .finally(() => setLoading(false));
            // } else {
            //     // ! this takes care of the case when the user loggin or reigster
            //     setLoading(false)
            //     setMessage({ ...message, username: loggedinInfo.loggedinUsername, userId : loggedinInfo.loggedinId});
            //     // * let everyone knows that they joined
            //     socket.emit("chat", { content: `${loggedinInfo.loggedinUsername} joined`, username: loggedinInfo.loggedinUsername, type: "JOIN", roomId : roomId, time : new Date(), userId : loggedinInfo?.loggedinId});
            // }
        }



        // ! handle incomimg messages
            socket.on('chat', (data) => {
                
                setMessages(messages => {return [...messages, data]});
                // let onlineNumber = socket.adapter.rooms.get('roomId');
                // console.log(onlineNumber);


                if (data.type === "CHAT" && data.userId !== loggedinInfo.loggedinId) {
                    beat.play().catch();
                }
            })


        // ! handleOnline number changes
        socket.on('onlineNumberUpdate', (data) => {
            // console.log(data);
            setOnlineNumber(data?.onlineNumber);
            // if (data.type === "CHAT" && data.userId !== loggedinInfo.loggedinId) {
            //     beat.play().catch();
            // }
        })


        // ! getting local storage data
        const data = localStorage.getItem(roomId);
        if (data) {
            setMessages(JSON.parse(data));
        }


        // ! disconnet is acting weired
        return function cleanup() {
            // if (loggedinInfo.loggedinUsername) {
            //     socket.emit("chat", { content: `${loggedinInfo.loggedinUsername} left`, username: loggedinInfo.loggedinUsername, type: "LEAVE", roomId : roomId , time : new Date(), userId : loggedinInfo?.loggedinId});
            // }
            // else {
            //     socket.emit("chat", { content: `a user left`, username: null , type: "LEAVE", roomId : roomId , time : new Date(),  userId : loggedinInfo?.loggedinId});
            // }
            socket.disconnect(true);
        }
    // eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (!loading && messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current?.scrollHeight;
        }

        localStorage.setItem(roomId, JSON.stringify(messages));
    }, [messages, loading, roomId, user]);

    const sendMessage = (e) => {
        e.preventDefault();

        // empty message or white space
        if (message.content.trim().length < 1) {
            return;
        }
        socket.emit('chat', {...message, time: new Date()});
        setMessage({...message, content: ""});

    };


    const getChatUsers = () => {
        // console.log("trying to get users");
        axios.post("http://localhost:8000/api/chatrooms/chatusers/all", {roomId : roomId})
        .then(res => {
            // console.log(res.data);
            setChatUsers(res.data);
        })
        .catch()
    };

    if (loading || !user) {
        return (
            <div id="chat-page" className="d-flex align-items-center justify-content-center vh-100 w-100 styled-text text-white">
                <PropagateLoader width={100} color="white" loading={loading} cssOverride={{display: "block", margin: "0 auto", borderColor: "red", position : "fixed", top: "50%", left: "47%" }} />
            </div>
        )
    }

    else {
        return (

            <div id="chat-page" className="d-flex align-items-center justify-content-center vh-100 w-100 styled-text text-white">
                <div className="chat-container w-100 w-sm-75 w-lg-62 w-xxl-50 mt-5 fade-in">

                    <div className="d-sm-flex justify-content-center align-items-center flex-column">
                        {/*  */}
                        <h2 id="chatroomName" className="text-center m-0">{roomId ? roomId : "Default Chatroom"}</h2>

                        {/* <p className="text-success mb-1"><span id="number-connected">2</span> Online</p>
                        
                        */}
                        <div className="d-flex justify-content-center">
                            <StyledAvatorGroup
                            max={4}
                            className="my-3"
                            sx = {{ '.css-5azhe6-MuiAvatarGroup-root' : {border: "0px"} }}
                            onClick={(e) => {setNone(""); getChatUsers();}}
                            >
                                {
                                    Array(onlineNumber).fill('1').map((person, i) => {
                                        return (
                                            <div key={i}>
                                                <StyledBadge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    variant="dot"
                                                    style={{cursor : "pointer"}}
                                                >
                                                    <Avatar sx={{ bgcolor: i === 0 ? user.avatarColor : blue[500]}}>

                                                        {i === 0 ? <AvatarIcon iconValue={user.avatarIcon}/> : <AccountCircleIcon />}
                                                        
                                                    </Avatar>
                                                </StyledBadge>
                                            </div>
                                        )
                                    })
                                }
                            </StyledAvatorGroup>
                        </div>

                        {/*  chat users */}
                        <Box sx={{ border: 1, pt: 1, px: 1, bgcolor: '#fff', borderRadius: "15px", borderColor: "#808080", zIndex: "1000" }}
                            style={{ position: 'fixed', top: "20%", display: [none] }}
                            className="w-sm-75 w-md-50 w-lg-40 w-xl-40">
                            <div className="d-flex justify-content-end">
                                <div className="close-button">
                                    <IconButton onClick={(e) => { setNone("none") }}>
                                        <CloseIcon fontSize="medium" sx={{ color: "#000" }} />
                                    </IconButton>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center flex-wrap text-wrap">
                                <List className="text-wrap pe-3 scroll-box" dense sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "15px", overflowY : "scroll" , maxHeight: "60vh"}}>
                                    {chatUsers ?
                                        <>{chatUsers.map((user, i) => {
                                            const labelId = `checkbox-list-secondary-label-${i}`;
                                            return (

                                                <div className="d-flex text-wrap justify-content-center" key={i}>

                                                    <ListItem className="text-black" sx={{}}
                                                        key={i}
                                                        disablePadding
                                                    // secondaryAction={
                                                    //     // <Checkbox
                                                    //     //     edge="end"
                                                    //     //     inputProps={{ 'aria-labelledby': labelId }}
                                                    //     // />
                                                    // }
                                                    >
                                                        <ListItemButton sx={{ py: 2 }} onClick={() => { window.open(`/users/${user._id}`) }}>
                                                            <ListItemAvatar>
                                                                <Avatar sx={{ bgcolor: user.avatarColor }}>
                                                                    <AvatarIcon iconValue={user.avatarIcon}/>
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={<h6 className="mb-0">{user.nickname}<em className="text-muted"> (@{user.username})</em></h6>} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <div className="d-flex align-items-center justify-content-end w-sm-50 w-md-50 w-lg-50 text-wrap flex-wrap">
                                                        <div>
                                                            <p id="profile-major-year-text" className="mb-0 me-2 text-dark">{user.year[1]} <br /><em className="text-muted ">{user.major}</em></p>
                                                        </div>

                                                    </div>
                                                </div>
                                            );
                                        })}

                                        </> : <><PropagateLoader width={50} color="white" loading={!chatUsers}/></>}
                                </List>
                            </div>
                        </Box>

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
                                            <p className={`${message.type === "JOIN" ? "text-success" : "text-secondary"}`}> {message.username ? <>@</> : <></>}{message.content}</p>
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