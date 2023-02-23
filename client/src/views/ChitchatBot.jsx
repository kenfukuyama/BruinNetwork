// import axios from 'axios';
import React from 'react'
// import { useContext } from 'react';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';
// import {LoggedinContext} from '../context/LoggedinContext';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {blue} from '@mui/material/colors';
import axios from 'axios';
// import data from './data'

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const ChitchatBot = () => {
     // ! for avator theme
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


    const messageAreaRef = useRef(null);
    // const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState({
        content : "",
        username : "Me",
        type : "CHAT"
    });
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setLoading(false);

        // setTimeout(() => {
        //     setMessages(messages =>{ return([...messages, 
        //         {
        //             content : "Hi there!",
        //             username : "BruinBot",
        //             type : "CHAT"
        //         }
        //     ])});
        // }, 700);
        // setTimeout(() => {
        //     setMessages(messages =>{ return([...messages, 
        //         {
        //             content : "How are you doing!",
        //             username : "BruinBot",
        //             type : "CHAT"
        //         }
        //     ])});
        // }, 1800);
        setTimeout(() => {
            setMessages(messages =>{ return([...messages, 
                {
                    content : "Hi! Chat with me!",
                    username : "BruinBot",
                    type : "BOT"
                }
            ])});
        }, 1000);


        // messages => {return [...messages, data]}

// eslint-disable-next-line
    }, []);


    useEffect(() => {

        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.content.trim().length < 1) {
            return;
        }

        let tempMessage = message.content;

        setMessages(messages =>{ return([...messages, message])})
        setMessage({...message, content: ""});


        // console.log(tempMessage);


        // Implemetation using google assistant
        // if (tempMessage.startsWith("search:")) {
        //     // console.log("searching");
        //     customSearch(tempMessage);
        // }

        // else {
        //     axios.post(`http://localhost:8000/api/bot/chat`, { query: tempMessage })
        //         .then(response => {
        //             // console.log(response);

        //             if (response.status === 200) {
        //                 setMessages(messages => {

        //                     return ([...messages,
        //                     {
        //                         content: response?.data?.msg,
        //                         username: "BruinBot",
        //                         type: "BOT"
        //                         // ! this might not always exited, and actually all of them
    
        //                     }
        //                     ]);
        //                 });
        //             }
        //             else {
        //                 customSearch(tempMessage);
        //             }
                    
        //         });
            
        // }     


        // Implemetation using chatgpt

        axios.post(`http://localhost:8000/api/chatgpt`, { prompt: tempMessage })
        .then(response => {
            // console.log(response);

            if (response.status === 200) {
                // console.log(response)
                setMessages(messages => {

                    return ([...messages,
                    {
                        content: response?.data?.choices[0]?.text,
                        username: "BruinBot",
                        type: "BOT"
                        // ! this might not always exited, and actually all of them

                    }
                    ]);
                });
            }
            else {
                setMessages(messages => {

                    return ([...messages,
                    {
                        content: "I can't help you right now. Maybe try it again later...",
                        username: "BruinBot",
                        type: "BOT"
                    }
                    ]);
                });
            }
            
        }).catch(error => {
            setMessages(messages => {

                return ([...messages,
                {
                    content: "I can't help you right now. Maybe try it again later...",
                    username: "BruinBot",
                    type: "BOT"
                }
                ]);
            });
        });

        // axios.post(`http://localhost:8000/api/bot/search`, {query : tempMessage})
        // .then (response => {
        //     console.log(response);
        //     setMessages(messages =>{ 
        //         let found = false;
        //         let tempTitle;
        //         try {
        //             tempTitle =  response.data?.items[0]?.title;
        //             found = found || tempTitle ? true : false;
        //         } 
        //         catch {
        //             tempTitle = "";
        //         }
    
        //         let tempLink;
        //         try {
        //             tempLink =  response.data?.items[0]?.link;
        //             found =  found || tempLink ? true : false;
        //         } 
        //         catch {
        //             tempLink = "";
        //         }
    
                
        //         let tempImg;
        //         try {
        //             tempImg =   response.data?.items[0]?.pagemap?.cse_thumbnail[0];
        //             found =  found || tempImg ? true : false;
        //         } 
        //         catch {
        //             tempImg = "";
        //         }
    
        //         let tempContent = found ? "Check this out!" : "Could not find anything ..."; 
    
        //         return ([...messages, 
        //             {
        //                 content : tempContent,
        //                 username : "BruinBot",
        //                 type : "BOT",
        //                 title : tempTitle,
        //                 link : tempLink,
        //                 img : tempImg,
        //                 // ! this might not always exited, and actually all of them
    
        //             }
        //         ]);
        //     });


        //     setTimeout(() => {
        //         setMessages(messages =>{ 
        //             let found = false;
        //             let tempTitle;
        //             try {
        //                 tempTitle =  response.data?.items[1]?.title;
        //                 found = found || tempTitle ? true : false;
        //             } 
        //             catch {
        //                 tempTitle = "";
        //             }
        
        //             let tempLink;
        //             try {
        //                 tempLink =  response.data?.items[1]?.link;
        //                 found =  found || tempLink ? true : false;
        //             } 
        //             catch {
        //                 tempLink = "";
        //             }
        
                    
        //             let tempImg;
        //             try {
        //                 tempImg =   response.data?.items[1]?.pagemap?.cse_thumbnail[0];
        //                 found =  found || tempImg ? true : false;
        //             } 
        //             catch {
        //                 tempImg = "";
        //             }
        
        //             let tempContent = found ? "And there we go!" : "I tried but no cigar..."; 
        
        //             return ([...messages, 
        //                 {
        //                     content : tempContent,
        //                     username : "BruinBot",
        //                     type : "BOT",
        //                     title : tempTitle,
        //                     link : tempLink,
        //                     img : tempImg,
        //                     // ! this might not always exited, and actually all of them
        
        //                 }
        //             ]);
        //         });


        //     }, 2000);

        // })

        // Bot response
        // setTimeout(() => {
        //     setMessages(messages =>{ return([...messages, 
        //         {
        //             content : "Check out the link that I found!",
        //             username : "BruinBot",
        //             type : "CHAT"
        //         },
        //         {
        //             content : `https://www.google.com/search?q=${tempMessage}`,
        //             username : "BruinBot",
        //             type : "CHAT"
        //         }
                
        //     ])});
        // }, 2000);

        // setMessages(messages =>{ return([...messages, 
        //             {
        //                 content : "Check this out!",
        //                 username : "BruinBot",
        //                 type : "BOT",
        //                 title : "HELLO! - Daily royal, celebrity, fashion, beauty & lifestyle news",
        //                 link : "https://www.hellomagazine.com/",
        //                 img : {
        //                     "src": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS0Bq7tO5sF1V1-1v8kvaTkeniZIbr9H25KVfV0i17dZbobXY9rmtUQn6Wv",
        //                     "width": "225",
        //                     "height": "225"
        //                 }
        //                 // ! this might not always exited, and actually all of them

        //             }
                    
        // ])});

        // setMessages(messages =>{ 
        //     let found = false;
        //     let tempTitle;
        //     try {
        //         tempTitle =  data?.items[0]?.title;
        //         found = found || tempTitle ? true : false;
        //     } 
        //     catch {
        //         tempTitle = "";
        //     }

        //     let tempLink;
        //     try {
        //         tempLink =  data?.items[0]?.link;
        //         found =  found || tempLink ? true : false;
        //     } 
        //     catch {
        //         tempLink = "";
        //     }

            
        //     let tempImg;
        //     try {
        //         tempImg =   data?.items[0]?.pagemap?.cse_thumbnail[0];
        //         found =  found || tempImg ? true : false;
        //     } 
        //     catch {
        //         tempImg = "";
        //     }

        //     let tempContent = found ? "Check this out!" : "Could not find anything ..."; 

        //     return ([...messages, 
        //         {
        //             content : tempContent,
        //             username : "BruinBot",
        //             type : "BOT",
        //             title : tempTitle,
        //             link : tempLink,
        //             img : tempImg,
        //             // ! this might not always exited, and actually all of them

        //         }
                
        //     ]);

        // });
        // console.log(data);
        // console.log(data.items[0]);

    };

    // for custom search
    // const customSearch = (tempMessage) => {
    //     axios.post(`http://localhost:8000/api/bot/search`, {query : tempMessage})
    //     .then (response => {
    //         // console.log(response);
    //         setMessages(messages =>{ 
    //             let found = false;
    //             let tempTitle;
    //             try {
    //                 tempTitle =  response.data?.items[0]?.title;
    //                 found = found || tempTitle ? true : false;
    //             } 
    //             catch {
    //                 tempTitle = "";
    //             }
    
    //             let tempLink;
    //             try {
    //                 tempLink =  response.data?.items[0]?.link;
    //                 found =  found || tempLink ? true : false;
    //             } 
    //             catch {
    //                 tempLink = "";
    //             }
    
                
    //             let tempImg;
    //             try {
    //                 tempImg =   response.data?.items[0]?.pagemap?.cse_thumbnail[0];
    //                 found =  found || tempImg ? true : false;
    //             } 
    //             catch {
    //                 tempImg = "";
    //             }
    
    //             let tempContent = found ? "Check this out!" : "Could not find anything ..."; 
    
    //             return ([...messages, 
    //                 {
    //                     content : tempContent,
    //                     username : "BruinBot",
    //                     type : "BOT",
    //                     title : tempTitle,
    //                     link : tempLink,
    //                     img : tempImg,
    //                     // ! this might not always exited, and actually all of them
    
    //                 }
    //             ]);
    //         });


    //         setTimeout(() => {
    //             setMessages(messages =>{ 
    //                 let found = false;
    //                 let tempTitle;
    //                 try {
    //                     tempTitle =  response.data?.items[1]?.title;
    //                     found = found || tempTitle ? true : false;
    //                 } 
    //                 catch {
    //                     tempTitle = "";
    //                 }
        
    //                 let tempLink;
    //                 try {
    //                     tempLink =  response.data?.items[1]?.link;
    //                     found =  found || tempLink ? true : false;
    //                 } 
    //                 catch {
    //                     tempLink = "";
    //                 }
        
                    
    //                 let tempImg;
    //                 try {
    //                     tempImg =   response.data?.items[1]?.pagemap?.cse_thumbnail[0];
    //                     found =  found || tempImg ? true : false;
    //                 } 
    //                 catch {
    //                     tempImg = "";
    //                 }
        
    //                 let tempContent = found ? "And there we go!" : "I tried but no cigar..."; 
        
    //                 return ([...messages, 
    //                     {
    //                         content : tempContent,
    //                         username : "BruinBot",
    //                         type : "BOT",
    //                         title : tempTitle,
    //                         link : tempLink,
    //                         img : tempImg,
    //                         // ! this might not always exited, and actually all of them
        
    //                     }
    //                 ]);
    //             });

    //         }, 2000);
    //     });

    // }

    if (loading) {
        return (
            <div id="chat-page" className="d-flex align-items-center justify-content-center vh-100 w-100 styled-text text-white">
                <PropagateLoader width={100} color="white" loading={loading} cssOverride={{display: "block", margin: "0 auto", borderColor: "red", position : "fixed", top: "50%", left: "47%" }} />
            </div>
        )
    }

    else {
        return (

            <div id="chat-page" className="d-flex align-items-center justify-content-center vh-100 w-100 styled-text text-whit fade-in">
                <div className="chat-container w-100 w-sm-75 w-lg-62 w-xxl-50 mt-5">
                    <div className="d-flex align-items-center mb-4 justify-content-center">
                        <div className="d-flex userName align-items-center">
                            <div className="">
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar sx={{ bgcolor: blue[500] }}>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </StyledBadge>

                            </div>
                            <div className="d-flex flex-column ms-3 justify-content-center align-items-center mt-2">
                                <div className="text-wrap">
                                    <h4 className="text-wrap mb-0 text-white">Bruin Bot</h4>
                                    {/* <p><em>Powered by Google Assistant</em></p> */}
                                    <p><em>Powered by OpenAI</em></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul id="messageArea" className="messageAreaPublic scroll-box" ref={messageAreaRef}>
                        {messages &&
                            messages.map((message, i) => {
                                return (
                                    (message.type === "CHAT") ? (
                                        <li className="chat-message sender" key={i}>
                                            <span>@{message.username}</span>
                                            <p className="mb-0">{message.content}</p>
                                        </li>
                                    ) : (
                                        
                                        <li className="chat-message receiver text-wrap" key={i}>
                                            <span>@{message.username}</span>
                                            <p className="mb-0">{message.content}</p> 
                                            <div className="text-wrap">
                                                {message.title &&
                                                    <div className="d-flex justify-content-center text-wrap">
                                                        <h6><hr/>{message.title}</h6>
                                                    </div>
                                                }
                                                {message.img &&
                                                    <div className="d-flex justify-content-center">
                                                        <img src={message.img.src} width={message.img.width} height={message.img.height} alt="Searched Img"/>
                                                    </div>
                                                }
                                                {message.link &&
                                                        <div className="d-flex justify-content-center text-wrap">
                                                            {/* <a href={message.link} className="center"><br /> {message.link}</a> */}
                                                            <p className="btn text-info text-wrap" onClick={e => window.open(message.link)}><u>{message.link} </u></p>
                                                
                                                        </div>
                                                }
                                            </div>
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

export default ChitchatBot;