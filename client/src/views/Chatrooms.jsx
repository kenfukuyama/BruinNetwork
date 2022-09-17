

import React from 'react'
import { useState } from 'react';


// user list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/box';

import rooms from '../data/rooms'



const Chatrooms = () => {
    const [roomSelection, setRoomSelection] = useState(-1);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const enterChat = (e) => {
        e.preventDefault();
        // console.log("trying to enter: " + roomSelection);

        if (roomSelection === -1) {
            setError("Please Select a Chatroom");
        } else {
            navigate(`/chatroom/${rooms[roomSelection]}`);
        }
        
    };

    const handleChange = (e, i) => {
        if (i !== -1) {
            setError("");
        }
        setRoomSelection(i);
    }


    return (
        <div>
            <div id="username-page" className="fade-in d-flex align-items-center text-white">
                <div className="container username-page-container text-center pt-5 vh-100 styled-text text-white">
                    <h2 className="mt-5">Discover Bruin Community</h2>
                    <p className="text-success"> <span className=""></span> 1203 online</p>
                    <div className="d-flex justify-content-center">
                        <div className="input-group search-bar p-4 w-md-50 w-lg-50">
                            <input type="text" className="form-control rounded live-search-box regular" placeholder="Search Channels" aria-label="Search Channels"
                                aria-describedby="search-addon" />
                            <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
                        </div>
                    </div>

                    {/* <!--#################################### START CHANNEL SELECTION  #######################################--> */}

                    <form name="chatroomNameForm" className="chatroomSelection">
                        {/* <div className="styled-text text-white mt-1 text-wrap"> */}

                            {/* <div className="col-sm-6 col-md-4 col-lg-3 category-selector live-search-list"> */}
                                {/* <p className="channelNickname">engineering</p> */}
                                {/* <input type="radio" name="chatroomName" id="${thisChannel.key.channelName}" value="${thisChannel.key.channelName}" checked="checked"> */}
                                {/* <input type="radio" name="chatroomName" id="engineering" value="engineering"/> */}
                                {/* <label className="category-image channel bg-primary" htmlFor="engineering" id="previewBtn"></label> */}
                            {/* </div> */}

                            {/* <div className="col-sm-6 col-md-4 col-lg-3 category-selector live-search-list"> */}
                                {/* <p className="channelNickname">premed</p> */}
                                {/* <input type="radio" name="chatroomName" id="${thisChannel.key.channelName}" value="${thisChannel.key.channelName}" checked="checked"> */}
                                {/* <input type="radio" name="chatroomName" id="premed" value="premed"/> */}

                                {/* <p className="channelNickname">humanity</p> */}
                                {/* <input type="radio" name="chatroomName" id="${thisChannel.key.channelName}" value="${thisChannel.key.channelName}" checked="checked"> */}
                                {/* <input type="radio" name="chatroomName" id="humanity" value="humanity"/> */}
                                {/* <label className="category-image channel bg-primary" htmlFor="engineering" id="previewBtn"></label> */}
                            {/* </div> */}
                                <div className="d-flex justify-content-center flex-wrap mx-0 px-0">
                                    <Box className="w-sm-100 w-md-75 w-lg-50">
                                        <List dense sx={{ width: '100%', bgcolor: 'transparent', borderRadius: "15px" }}>
                                            {rooms.map((room, i) => {
                                                const labelId = `checkbox-list-secondary-label-${i}`;
                                                return (
                                                    <ListItem sx={{ px: 2 }}
                                                        key={i}>
                                                        <ListItemButton sx={{ py: 3 }} onClick={(e) => {handleChange(e, i)}} >
                                                            <ListItemAvatar>
                                                                <Avatar sx={{ bgcolor: blue[500] }}>
                                                                    <AccountCircleIcon />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText className="text-wrap" id={labelId} primary={<h6 className="mb-0 text-wrap">{room}</h6>} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </Box>
                                </div>


                        {/* </div> */}


                        <div className="form-group fixed-bottom mb-4">
                            {error && <p className = "text-danger">{error}</p>} 
                            <button type="submit" className={`chatrooms-submit ${roomSelection === -1 ? "bg-transparent border-info" : ""} text-wrap btn btn-lg w-md-21 w-lg-16 w-xl-14 w-xxl-12 ${error ? "border-danger" : ""}`} onClick={enterChat}>
                                {roomSelection === -1 ? <>Let's Chat</> : <>{rooms[roomSelection]} <i className="bi-arrow-right-short"></i></>}

                                
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chatrooms;
