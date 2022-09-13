

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




const Chatrooms = () => {
    const rooms = ["Engineering", "Premed", "Law", "Cooking", "Sport"];
    const [roomSelection, setRoomSelection] = useState(0);
    const navigate = useNavigate();


    const enterChat = (e) => {
        e.preventDefault();
        // console.log("trying to enter: " + roomSelection);
        navigate(`/chatroom/${rooms[roomSelection]}`);
    };


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
                        <div className="row styled-text text-white mt-1" onChange={(e) => {setRoomSelection(e.target.value)}}>

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
                                <div className="d-flex justify-content-center flex-wrap">
                                    <Box sx={{ width: '50%'}}>
                                        <List dense sx={{ width: '100%', bgcolor: 'transparent', borderRadius: "15px" }}>
                                            {rooms.map((room, i) => {
                                                const labelId = `checkbox-list-secondary-label-${i}`;
                                                return (
                                                    <ListItem sx={{ px: 2 }}
                                                        key={i}>
                                                        <ListItemButton sx={{ py: 3 }} onClick={(e) => {setRoomSelection(i)}} >
                                                            <ListItemAvatar>
                                                                <Avatar sx={{ bgcolor: blue[500] }}>
                                                                    <AccountCircleIcon />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={<h6 className="mb-0">{room}</h6>} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </Box>
                                </div>



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
