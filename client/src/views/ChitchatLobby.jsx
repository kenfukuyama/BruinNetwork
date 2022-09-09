
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
    const [connecting, setConnecting] = useState(false);
    const interval = useRef(null);
    const {loggedinInfo} = useContext(LoggedinContext);
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
                            setConnecting(false);
                            navigate(`/chatroom/${roomId}`)
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
            clearInterval(interval.current);
        }
    }, [connecting, navigate, loggedinInfo.loggedinId])



    const enterWaitingRoom = (e) => {
        setConnecting(true);
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