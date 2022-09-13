
// import axios from 'axios';
import axios from 'axios';
import React, { useRef } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
// import { useState } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';


import RingLoader from 'react-spinners/RingLoader';
import { useNavigate } from 'react-router-dom';

const ChitchatLobby = () => {
    
    const interval = useRef(null);
    const {loggedinInfo, setLoggedinInfo, setChitchatRoomId} = useContext(LoggedinContext);
    // const [connecting, setConnecting] = useState(loggedinInfo.isInQueue);
    const navigate = useNavigate();


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        } 


    // eslint-disable-next-line
    }, []);


    useEffect(() => {

        if (loggedinInfo.isInQueue) {
            console.log("it's connecting");
            // check back end every 3 second
            interval.current = setInterval(() => {
                // console.log("running interval every interval");
                // axios.get('http://localhost:8000/api/chitchat/queue')
                // .then(res => console.log(res.data))
                // .catch(err => console.error(err));

                // * this checks the queue but also creates it if it does not exist
                axios.post('http://localhost:8000/api/chitchat/check-queue', {
                    userId: loggedinInfo.loggedinId
                })
                    .then(res => {
                        console.log(res.status);
                        // ! found so it set isInQueue to false and set up the chitchatroom id
                        if (res.status === 200) {
                            console.log(res.data[loggedinInfo.loggedinId].roomId);
                            let roomId = res.data[loggedinInfo.loggedinId].roomId; 

                            // do everything we need to enter the chatroom and popups
                            // setConnecting(false);

                            // clears tht interval;
                            clearInterval(interval.current);
                            // clears the timeoutId as well (clock should not be ticking);
                            clearTimeout(loggedinInfo.timeOutId);

                            setChitchatRoomId([true, roomId]);
                            setLoggedinInfo ({ ...loggedinInfo, isInQueue : false, chitchatRoom :  roomId, timeOutId : null});
                            // let otherUserId = roomId.replace(loggedinInfo.loggedinId, "");
                            // alert("you entering the chat");
                            // if (confirm("Do you want to enter the chat")) {
                            // navigate(`/chitchat/${roomId}`);
                            // }

                        }
                        
                    })
                    .catch(err => console.error(err));
            }, 3000); // ! the check queue frequecy

            // ! stop the interval and removes the user from the queue
            // ! we need to make sure that only one setTimeout is runnig

            // ! clear the previous time out before sets it
            if (loggedinInfo.timeOutId) {
                console.log(loggedinInfo.timeOutId);
                clearTimeout(loggedinInfo.timeOutId);
            }

            let temptimeOutId = setTimeout(() => {
                console.log("setTimeout dispatch");
                // removes the interval and set the isInQueue to false
                clearInterval(interval.current);
                // ! this loogedinInfo referes to the one currently have so it will overwreites the onne at line 64 (setLoggedinInfo ({ ...loggedinInfo, isInQueue : false, chitchatRoom :  roomId, timeOutId : null});)
                setLoggedinInfo ({ ...loggedinInfo, isInQueue : false});
                // remove yourself from the queue too.
                axios.post('http://localhost:8000/api/chitchat/leave-queue', {
                    userId: loggedinInfo.loggedinId
                })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => console.error(err));
            }, 45 * 1000) // ! when to stop checking queue frequecy
            // console.log("timeout Id + " + timeOutId);

            // ! timeoutId will be null automatically after the dispatch
            setLoggedinInfo({ ...loggedinInfo, timeOutId : temptimeOutId });

        }

        // if (!connecting) {
        //     console.log("stop connecting");
        //     clearInterval(interval.current);
        // }

        return function cleanup() {
            // console.log("running dismout clean up");
            // clearInterval(interval.current);
        }
    // eslint-disable-next-line
    }, [loggedinInfo.loggedinId, loggedinInfo.isInQueue])



    const enterWaitingRoom = (e) => {
        // setConnecting(true);
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
        // setConnecting(false);
        setLoggedinInfo ({ ...loggedinInfo, isInQueue : false});
        clearInterval(interval.current);
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
                    <RingLoader loading={loggedinInfo.isInQueue} cssOverride={{margin: "0 auto", marginBottom: "20px"}} size={150} color={"white"}/>
                    {loggedinInfo.isInQueue ? <button className="btn btn-outline-primary" onClick={exitWaitingRoom}>Connecting ...</button> : <button className="btn btn-outline-light" onClick={enterWaitingRoom}>Connect with a Random Bruin</button>
                }
                </div>
            </div>

        </>
    )
}

export default ChitchatLobby;