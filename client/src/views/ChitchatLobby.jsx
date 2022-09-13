
// import axios from 'axios';
import axios from 'axios';
import React, { useRef } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';


import RingLoader from 'react-spinners/RingLoader';
import { useNavigate } from 'react-router-dom';

const ChitchatLobby = () => {
    
    const interval = useRef(null);
    const {loggedinInfo, setLoggedinInfo} = useContext(LoggedinContext);
    const [connecting, setConnecting] = useState(loggedinInfo.isInQueue);
    const navigate = useNavigate();


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        } 


    // eslint-disable-next-line
    }, []);


    useEffect(() => {

        if (connecting) {
            console.log("it's connecting");
            // check back end every 3 second
            interval.current = setInterval(() => {
                // console.log("running interval every interval");
                // axios.get('http://localhost:8000/api/chitchat/queue')
                // .then(res => console.log(res.data))
                // .catch(err => console.error(err));

                axios.post('http://localhost:8000/api/chitchat/check-queue', {
                    userId: loggedinInfo.loggedinId
                })
                    .then(res => {
                        console.log(res.status);
                        if (res.status === 200) {
                            console.log(res.data[loggedinInfo.loggedinId].roomId);
                            let roomId = res.data[loggedinInfo.loggedinId].roomId; 

                            // do everything we need to enter the chatroom and popups
                            setConnecting(false);
                            clearInterval(interval.current);
                            setLoggedinInfo ({ ...loggedinInfo, isInQueue : false});
                            // let otherUserId = roomId.replace(loggedinInfo.loggedinId, "");
                            setLoggedinInfo ({ ...loggedinInfo, chitchatRoom :  roomId});
                            // alert("you entering the chat");
                            // if (confirm("Do you want to enter the chat")) {
                            // navigate(`/chitchat/${roomId}`);
                            // }

                        }
                        
                    })
                    .catch(err => console.error(err));
            }, 3000);

        }

        if (!connecting) {
            console.log("stop connecting");
            clearInterval(interval.current);
        }

        return function cleanup() {
            // console.log("running dismout clean up");
            // clearInterval(interval.current);
        }
    // eslint-disable-next-line
    }, [connecting, navigate, loggedinInfo.loggedinId])



    const enterWaitingRoom = (e) => {
        setConnecting(true);
        setLoggedinInfo ({ ...loggedinInfo, isInQueue : true});
        axios.post('http://localhost:8000/api/chitchat/join-queue', {
            userId: loggedinInfo.loggedinId
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.error(err));
    }

    const exitWaitingRoom = (e) => {
        setConnecting(false);
        setLoggedinInfo ({ ...loggedinInfo, isInQueue : false});
        // ? axios.delete is not working somehow
        axios.post('http://localhost:8000/api/chitchat/leave-queue', {
            userId: loggedinInfo.loggedinId
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.error(err));
    }



    return (
        <>
            <div id="chitchat-lobby-page" className="fade-in d-flex align-items-center text-white vh-100">
                <div className="connect-btns" style={{margin: "0 auto"}}>
                    <RingLoader loading={connecting} cssOverride={{margin: "0 auto", marginBottom: "20px"}} size={150} color={"white"}/>
                    {connecting ? <button className="btn btn-outline-primary" onClick={exitWaitingRoom}>Connecting ...</button> : <button className="btn btn-outline-light" onClick={enterWaitingRoom}>Connect with a Random Bruin</button>
                }
                </div>
            </div>

        </>
    )
}

export default ChitchatLobby;