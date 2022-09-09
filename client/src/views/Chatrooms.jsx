

import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Chatrooms = () => {
    const [roomSelection, setRoomSelection] = useState("");
    const navigate = useNavigate();


    const enterChat = (e) => {
        e.preventDefault();
        // console.log("trying to enter: " + roomSelection);
        navigate(`/chatroom/${roomSelection}`);
    };


    return (
        <div>
            <div id="username-page" className="fade-in d-flex align-items-center text-white">
                <div className="container username-page-container text-center pt-5 vh-100 styled-text text-white">
                    <h2 className="mt-5">Select your room, username</h2>
                    <p className="text-success"> <span className=""></span> 1203 online</p>
                    <div className="d-flex justify-content-center">
                        <div className="input-group search-bar p-4 w-md-75 w-lg-50">
                            <input type="text" className="form-control rounded live-search-box regular" placeholder="Search Channels" aria-label="Search Channels"
                                aria-describedby="search-addon" />
                            <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
                        </div>
                    </div>

                    {/* <!--#################################### START CHANNEL SELECTION  #######################################--> */}

                    <form name="chatroomNameForm" className="chatroomSelection">
                        <div className="row styled-text text-white mt-1" onChange={(e) => {setRoomSelection(e.target.value)}}>

                            {/* <div className="col-sm-6 col-md-4 col-lg-3 category-selector live-search-list"> */}
                                <p className="channelNickname">engineering</p>
                                {/* <input type="radio" name="chatroomName" id="${thisChannel.key.channelName}" value="${thisChannel.key.channelName}" checked="checked"> */}
                                <input type="radio" name="chatroomName" id="engineering" value="engineering"/>
                                {/* <label className="category-image channel bg-primary" htmlFor="engineering" id="previewBtn"></label> */}
                            {/* </div> */}

                            {/* <div className="col-sm-6 col-md-4 col-lg-3 category-selector live-search-list"> */}
                                <p className="channelNickname">premed</p>
                                {/* <input type="radio" name="chatroomName" id="${thisChannel.key.channelName}" value="${thisChannel.key.channelName}" checked="checked"> */}
                                <input type="radio" name="chatroomName" id="premed" value="premed"/>

                                <p className="channelNickname">humanity</p>
                                {/* <input type="radio" name="chatroomName" id="${thisChannel.key.channelName}" value="${thisChannel.key.channelName}" checked="checked"> */}
                                <input type="radio" name="chatroomName" id="humanity" value="humanity"/>
                                {/* <label className="category-image channel bg-primary" htmlFor="engineering" id="previewBtn"></label> */}
                            {/* </div> */}


                        </div>


                        <div className="form-group fixed-bottom mb-4">
                            <button type="submit" className="chatrooms-submit styled-button btn btn-lg w-md-21 w-lg-16 w-xl-14 w-xxl-12" onClick={enterChat}>Let's Chat <i className="bi-arrow-right-short"></i></button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chatrooms;
