

import React, { useRef } from 'react'
import { useState } from 'react';


// user list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { blue, teal, cyan } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/box';

import rooms from '../assets/rooms'
import { useEffect } from 'react';
import axios from 'axios';
// import { LoggedinContext } from '../context/LoggedinContext';
// import { useContext } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

// import Collapsible from 'react-collapsible';
// import AssistantIcon from '@mui/icons-material/Assistant';
import SchoolIcon from '@mui/icons-material/School';
import ChairIcon from '@mui/icons-material/Chair';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
const GuestChatrooms = () => {
    let chatrooms = rooms;



    const [roomSelection, setRoomSelection] = useState(-1);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // const user = useRef(null);
    // const recentButtonRef = useRef(null);
    const onlineNumbers = useRef(null);
    // const { loggedinInfo } = useContext(LoggedinContext);

    const [displayRooms, setDisplayRooms] = useState(chatrooms);
    const [query, setQuery] = useState("");


    useEffect(() => {
        axios.post('http://localhost:8000/api/chatrooms/online-number/all', {})
            .then(res => {
                // console.log(res.data);
                onlineNumbers.current = res.data;
                // setLoading(false);
            })
            .finally(() => { setLoading(false)});
        // eslint-disable-next-line
    }, []);

    const enterChat = (e) => {
        e.preventDefault();
        // console.log("trying to enter: " + roomSelection);


        setError("Please login or register to join a chatroom");

    };

    // const updateRecentRooms = (roomSelection) => {
    //     // console.log(user.current);
    //     let i;
    //     for (i = 0; i < user?.current?.recentRooms?.length - 1; i++) {
    //         // stop your index at where is "" or it hits the currently selected one
    //         if (user.current.recentRooms[i] === -1 || user.current.recentRooms[i] === roomSelection) {
    //             break;
    //         }
    //     }

    //     // console.log(i);

    //     // move the cursor for place to put the current selected room to the fornt
    //     for (let j = i; j > 0; j--) {
    //         // keep swapping
    //         [user.current.recentRooms[j], user.current.recentRooms[j-1]] = [user.current.recentRooms[j-1], user.current.recentRooms[j]];
    //     }

    //     // insert the currently selected room to the front
    //     user.current.recentRooms[0] = roomSelection;
    //     // console.log(user.current.recentRooms);

    //         axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user.current)
    //             .then(res => {
    //                 // console.log(res.data)
    //             })
    //             .catch();
    // }

    const handleChange = (e, idx) => {
        if (idx !== -1) {
            setError("");
        }

        if (!query) {
            // no query just pure value
            setRoomSelection(idx);
            return;

        }
        else {
            let tempIdx = 0;
            for (let i = 0; i < chatrooms.length; i++) {
                if (chatrooms[i][0] === displayRooms[idx][0]) {
                    tempIdx = i;
                    break;
                }
            }
            setRoomSelection(tempIdx);
        }
    }

    const search = (e) => {
        setQuery(e.target.value);
        let query = e.target.value.toString().toLowerCase();
        setDisplayRooms(chatrooms.filter(room => {
            let target = room[0].toString().toLowerCase();
            let target1 = room[1].toString().toLowerCase();
            return (target.includes(query) || target1.includes(query));
        }));
    }




    return (
        <div>
            <div id="username-page" className="fade-in d-flex align-items-center text-white">
                <div className="container username-page-container text-center pt-5 vh-100 styled-text text-white">
                    {loading ?
                        (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                        :
                        (
                            <>
                                <h2 className="mt-5">{roomSelection === -1 ? "Discover Bruin Community" : chatrooms[roomSelection][0]}</h2>
                                {/* <p className="text-success"> <span className=""></span> 1203 online</p> */}
                                <div className="d-flex justify-content-center">
                                    <div className="input-group search-bar p-4 w-md-75 w-lg-50">
                                        <input type="text"
                                            className="form-control rounded live-search-box"
                                            placeholder="Search Chatrooms"
                                            aria-label="Search Chatrooms"
                                            aria-describedby="search-addon"
                                            onChange={e => { search(e) }}
                                            value={query}
                                        />
                                    </div>
                                </div>

                                {/* <!--#################################### START CHANNEL SELECTION  #######################################--> */}


                                {/* <form name="chatroomNameForm" className="chatroomSelection"> */}

                                <div className="d-flex justify-content-center flex-wrap mx-0 px-0">
                                    <Box className="w-sm-100 w-md-75 w-lg-50">
                                        <List dense sx={{ width: '100%', bgcolor: 'transparent', borderRadius: "15px" }}>
                                            {displayRooms.map((room, i) => {
                                                const labelId = `checkbox-list-secondary-label-${i}`;
                                                return (
                                                    <div className="d-flex align-items-center justify-content-between" key={i}>
                                                        <ListItem sx={{ px: 2 }}
                                                            key={i}>
                                                            <ListItemButton sx={{ py: 3 }} onClick={(e) => { handleChange(e, i) }} >
                                                                <ListItemAvatar>
                                                                    <Avatar sx={{
                                                                        bgcolor:
                                                                            room[1] === "major" ? blue[500] :
                                                                                (room[1] === "dorm" || room[1] === "on campus" ? teal[500] :
                                                                                    (room[1] === "university apartment" || room[1] === "off campus" ? cyan[500] :
                                                                                        ""
                                                                                    )
                                                                                )
                                                                    }}>

                                                                        {room[1] === "major" ? <SchoolIcon /> :
                                                                            <> {room[1] === "dorm" || room[1] === "on campus" ? <ChairIcon /> :
                                                                                <> {room[1] === "university apartment" || room[1] === "off campus" ? <MapsHomeWorkIcon /> :
                                                                                    <>
                                                                                    </>
                                                                                } </>
                                                                            } </>
                                                                        }
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText className="text-wrap" id={labelId} primary={<h6 className="mb-0 text-wrap">{room[0]}<em className="text-muted"><br />{room[1]}</em></h6>} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                        <div className="category d-flex align-items-center justify-content-center">
                                                            {/* <p className="pe-1 text-muted">Major</p> */}
                                                            {onlineNumbers.current ? <>
                                                                {onlineNumbers.current[room[0]] ?
                                                                    <>
                                                                        <div className="online-number">
                                                                            <p className="pe-1 text-muted mb-0">{onlineNumbers.current[room[0]]}</p>
                                                                        </div>
                                                                        <svg height="25" width="25" className="blinking">
                                                                            <circle cx="12.5" cy="12.5" r="5" fill="green" />
                                                                        </svg>
                                                                    </>
                                                                    : <></>}

                                                            </> : <></>}

                                                            {/* <p className="pe-1 text-muted">{onlineNumbers.current[chatrooms[recentSelection]] ? onlineNumbers.current[chatrooms[recentSelection]] : ""}</p> */}

                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </List>
                                    </Box>
                                </div>


                                {/* </div> */}


                                <div className="form-group fixed-bottom mb-4">
                                    {error && <p className="text-danger">{error}</p>}
                                    <div className="d-flex justify-content-center gap-3">
                                        {/* <Link className="chatrooms-submit text-wrap btn btn-lg w-sm-50 w-md-25 w-lg-16 text-normal" to={"/guests/chatrooms"}><i className="bi-arrow-left-short"></i> <strong>See Events</strong> </Link> */}
                                        <button type="submit" className='chatrooms-submit text-wrap btn btn-lg w-sm-50 w-md-25 w-lg-16 text-white' onClick={() => {navigate("/guests/events")}}>
                                            <i className="bi-arrow-left-short"></i> See Events
                                        </button>
                                        <button type="submit" className={`chatrooms-submit text-wrap btn btn-lg w-sm-50 w-md-25 w-lg-16 ${error ? "border-danger" : ""} text-white`} onClick={enterChat}>
                                            Start Chatting <i className="bi-arrow-right-short"></i>
                                        </button>
                                    </div>
                                    
                                </div>

                                {/* </form> */}
                            </>
                        )

                    }


                </div>
            </div>
        </div>
    )
}

export default GuestChatrooms;
