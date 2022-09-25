

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
import { blue, lime, teal, cyan} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/box';

import rooms from '../assets/rooms'
import { useEffect } from 'react';
import axios from 'axios';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

import Collapsible from 'react-collapsible';
import AssistantIcon from '@mui/icons-material/Assistant';
import SchoolIcon from '@mui/icons-material/School';
import ChairIcon from '@mui/icons-material/Chair';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const Chatrooms = () => {
    let chatrooms = rooms;



    const [roomSelection, setRoomSelection] = useState(-1);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useRef(null);
    const recentButtonRef = useRef(null);
    // const onlineNumbers = useRef(null);
    const [onlineNumbers, setonlineNumbers] = useState(null);
    const { loggedinInfo } = useContext(LoggedinContext);

    const [displayRooms, setDisplayRooms] = useState(chatrooms);
    const [query, setQuery] = useState("");


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            setLoading(false);
            return;
        }

        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
            .then(res => {
                
                user.current = res.data;
                // console.log(user.current.recentRooms);
                setLoading(false);
            })
            .finally(() => setLoading(false));


        axios.post('http://localhost:8000/api/chatrooms/online-number/all', {})
        .then(res => {
            // console.log(res.data);
            // onlineNumbers = res.data;
            setonlineNumbers(res.data);
        })
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!loading && recentButtonRef.current) {
            recentButtonRef.current.click();
        } 
    }, [loading]);


    const enterChat = (e) => {
        e.preventDefault();
        // console.log("trying to enter: " + roomSelection);

        if (roomSelection === -1) {
            setError("Please Select a Chatroom");
        } else {
            // console.log("running here");
            // console.log(chatrooms[1][0]);
            // console.log(displayRooms[roomSelection]);
            // console.log(displayRooms[roomSelection][0]);
            // console.log(displayRooms[roomSelection][0] === chatrooms[1][0]);

            // find the index first
            // let tempIdx = 0;
            // for (let i = 0; i < chatrooms.length; i++) {
            //     if (chatrooms[i][0] === displayRooms[roomSelection][0]) {
            //         tempIdx = i;
            //         console.log("found at" + i);
            //         break;
            //     }
            // }
            // console.log(tempIdx );


            updateRecentRooms(roomSelection);
            // replace `/` with an escape character
            let formattedRoom = chatrooms[roomSelection][0].replace("/", "%2F");
            navigate(`/chatroom/${formattedRoom}`);
        }

    };

    const updateRecentRooms = (roomSelection) => {
        // console.log(user.current);
        let i;
        for (i = 0; i < user?.current?.recentRooms?.length - 1; i++) {
            // stop your index at where is "" or it hits the currently selected one
            if (user.current.recentRooms[i] === -1 || user.current.recentRooms[i] === roomSelection) {
                break;
            }
        }

        // console.log(i);

        // move the cursor for place to put the current selected room to the fornt
        for (let j = i; j > 0; j--) {
            // keep swapping
            [user.current.recentRooms[j], user.current.recentRooms[j-1]] = [user.current.recentRooms[j-1], user.current.recentRooms[j]];
        }

        // insert the currently selected room to the front
        user.current.recentRooms[0] = roomSelection;
        // console.log(user.current.recentRooms);

            axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user.current)
                .then(res => {
                    // console.log(res.data)
                })
                .catch();
    }

    const handleChange = (e, idx) => {
        if (idx!== -1) {
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
                                <h2 className="mt-5">Discover Bruin Community</h2>
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


                                {!loading &&  user.current
                                                ? <Collapsible trigger={<button className="btn pb-0 mb-0 btn-outline-primary" ref={recentButtonRef}>
                                                    <p className="mb-1">Recent Rooms <i className="bi bi-chevron-down"></i></p>
                                                </button>
                                                } triggerWhenOpen={<button className="btn pb-0 mb-0" id="btnCollapse">
                                                    <p className="text-muted mb-1"><i className="bi bi-chevron-up"></i></p>
                                                </button>}>

                                                <div className="d-flex justify-content-center flex-wrap mx-0 px-0">
                                                    <Box className="w-sm-100 w-md-75 w-lg-50">
                                                        <List dense sx={{ width: '100%', bgcolor: 'transparent', borderRadius: "15px" }}>
                                                            {user.current.recentRooms.map((recentSelection, i) => {
                                                                const labelId = `checkbox-list-secondary-label-${i}`;
                                                                return (
                                                                    <div key={i}>
                                                                        {recentSelection === -1 ? <></>
                                                                            : <>
                                                                                <div className="d-flex align-items-center justify-content-between">
                                                                                    <ListItem sx={{ px: 2 }}
                                                                                        key={i}>
                                                                                        <ListItemButton sx={{ py: 3 }} onClick={(e) => { handleChange(e, recentSelection) }} >
                                                                                            <ListItemAvatar>
                                                                                                <Avatar sx={{ bgcolor: lime[800] }}>
                                                                                                    <AssistantIcon />
                                                                                                </Avatar>
                                                                                            </ListItemAvatar>
                                                                                            {/* <ListItemText className="text-wrap" id={labelId} primary={<h6 className="mb-0 text-wrap">{chatrooms[recentSelection]}</h6>} /> */}
                                                                                            <ListItemText className="text-wrap" id={labelId} primary={<h6 className="mb-0 text-wrap">{chatrooms[recentSelection][0]}<em className="text-muted"><br/>{chatrooms[recentSelection][1]}</em></h6>} />
                                                                                        </ListItemButton>
                                                                                    </ListItem>
                                                                                    <div className="category d-flex align-items-center justify-content-center">
                                                                                        {/* <p className="pe-1 text-muted">Major</p> */}
                                                                                        { onlineNumbers ? <>
                                                                                                {onlineNumbers[chatrooms[recentSelection][0]] ? 
                                                                                                <>
                                                                                                    <div className="online-number">
                                                                                                        <p className="pe-1 text-muted mb-0">{onlineNumbers[chatrooms[recentSelection][0]] }</p>
                                                                                                    </div>
                                                                                                    <svg height="25" width="25" className="blinking">
                                                                                                        <circle cx="12.5" cy="12.5" r="5" fill="green" />
                                                                                                    </svg> 
                                                                                                </>
                                                                                            : <></>}
                                                                                        
                                                                                        
                                                                                        </> : <></>}
                                                                                        
                                                                                        
                                                                                        {/* <p className="pe-1 text-muted">{onlineNumbers[chatrooms[recentSelection]] ? onlineNumbers[chatrooms[recentSelection]] : ""}</p> */}

                                                                                    </div>
                                                                                </div>
                                                                            </>}

                                                                    </div>
                                                                    

                                                                );
                                                            })}
                                                        </List>
                                                    </Box>
                                                </div>

                                                </Collapsible>
                                                : <>
                                                    <p className="text-muted mb-1">loading recent rooms...</p>
                                                </>
                                            }

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
                                                                        <Avatar sx={{ bgcolor: 
                                                                            room[1] === "major" ?  blue[500] : 
                                                                                (room[1] === "dorm" || room[1] === "on campus" ? teal[500] :
                                                                                    (room[1] === "university apartment" ||  room[1] === "off campus" ? cyan[500] : 
                                                                                        ""
                                                                                    )
                                                                                ) 
                                                                        }}>
                                                                            
                                                                        {room[1] ==="major" ?  <SchoolIcon /> : 
                                                                            <> {room[1] === "dorm" || room[1] === "on campus" ? <ChairIcon/> : 
                                                                                <> {room[1] === "university apartment" ||  room[1] === "off campus" ? <MapsHomeWorkIcon/> : 
                                                                                    <>
                                                                                    </>
                                                                                } </>
                                                                            } </>
                                                                        }
                                                                        </Avatar>
                                                                    </ListItemAvatar>
                                                                    <ListItemText className="text-wrap" id={labelId} primary={<h6 className="mb-0 text-wrap">{room[0]}<em className="text-muted"><br/>{room[1]}</em></h6>} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <div className="category d-flex align-items-center justify-content-center">
                                                                {/* <p className="pe-1 text-muted">Major</p> */}
                                                                {onlineNumbers ? <>
                                                                    {onlineNumbers[room[0]] ?
                                                                        <>
                                                                            <div className="online-number">
                                                                                <p className="pe-1 text-muted mb-0">{onlineNumbers[room[0]]}</p>
                                                                            </div>
                                                                            <svg height="25" width="25" className="blinking">
                                                                                <circle cx="12.5" cy="12.5" r="5" fill="green" />
                                                                            </svg>
                                                                        </>
                                                                        : <></>}

                                                                </> : <></>}

                                                                {/* <p className="pe-1 text-muted">{onlineNumbers[chatrooms[recentSelection]] ? onlineNumbers[chatrooms[recentSelection]] : ""}</p> */}

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
                                        <button type="submit" className={`chatrooms-submit text-white ${roomSelection === -1 ? "bg-transparent border-info" : ""} text-wrap btn btn-lg w-md-50 w-lg-25 w-xl-25 w-xxl-25 ${error ? "border-danger" : ""}`} onClick={enterChat}>
                                            {roomSelection === -1 ? <>Let's Chat</> : <>{chatrooms[roomSelection][0]} <i className="bi-arrow-right-short"></i></>}


                                        </button>
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

export default Chatrooms;
