
import axios from 'axios';
import React from 'react'
import { useState } from 'react';

import RingLoader from 'react-spinners/RingLoader';

const ChitchatLobby = () => {
    const [connecting, setConnecting] = useState(false);


    const enterWaitingRoom = (e) => {
        setConnecting(!connecting);
    }

    return (
        <>
            <div id="chitchat-lobby-page" className="fade-in d-flex align-items-center text-white vh-100">
                <div className="connect-btns" style={{margin: "0 auto"}}>
                    <RingLoader loading={connecting} cssOverride={{margin: "0 auto", marginBottom: "20px"}} size={150} color={"white"}/>
                    <button className="btn btn-outline-light" onClick={enterWaitingRoom}>{connecting ? "connecting" : "Connect with a Random Bruin"}</button>
                </div>
            </div>

        </>
    )
}

export default ChitchatLobby;