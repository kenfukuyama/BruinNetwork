import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';

import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { blue } from '@mui/material/colors';

import { useRef } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

// import Chip from '@mui/material/Chip';
// import Collapsible from 'react-collapsible';

// import Box from '@mui/material/Box';
// import Popper from '@mui/material/Popper';
// import InfoIcon from '@mui/icons-material/Info';
// import IconButton from '@mui/material/IconButton';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EventIcon from '@mui/icons-material/Event';
import AvatarIcon from '../components/AvatarIcon';

const EventPage = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();
    const { loggedinInfo } = useContext(LoggedinContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    // const [userSavedEvents, setUserSavedEvents] = useState([]);

    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [creator, setCreator] = useState(null);


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }


        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
            .then(res => {
                setUser(res.data);
            })
            .finally();



        // axios.get('http://localhost:8000/api/events/' + id)
        //     .then(res => {
        //         setEvent(formatEvents(res.data));
        //         // console.log(res.data.creator);
        //         return axios.get('http://localhost:8000/api/users/' + res.data.creator)
        //     })
        //     .then(res => {
        //         // console.log(res.data);
        //         setCreator(res.data);
        //         setLoading(false);
        //     })
        //     .catch()
        //     .finally(() => setLoading(false));


        //!  dismoutn return
        // return () => {
        //     if (user) {
        //         axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user)
        //             .then(res => {
        //                 console.log(res.data);
        //             })
        //             .catch(err => { console.error(err) });
        //     }

        // };

     // eslint-disable-next-line 
    }, [loggedinInfo.loggedin, id, navigate, loggedinInfo.loggedinId])


    // useEffect(() => {
    //     /// get all the events crated by the user.
    //     axios.get('http://localhost:8000/api/users/' + id + "/saved-events")
    //         // axios.get("api/events/user/6317f12d985af7817efe4bc9")
    //         .then(res => {
    //             // console.log("running this");
    //             // console.log(res.data);
    //             setUserSavedEvents(formatEvents(res.data));
    //             // console.log(userSavedEvents.current
    //         })
    //     // .catch( err => console.log(err))s

    //     // eslint-disable-next-line
    // }, [user, id])



    // saved events handler
    // const getSavedEvents = () => {
    //     // only make a api when it does not exist yet
    //     /// get all the events crated by the user.

    //     if (userSavedEvents === null) {
    //         axios.get('http://localhost:8000/api/users/' + user._id + "/saved-events")
    //             // axios.get("api/events/user/6317f12d985af7817efe4bc9")
    //             .then(res => {
    //                 setUserSavedEvents(formatEvents(res.data));
    //                 // console.log(userSavedEvents.current);
    //             })
    //             .catch(err => console.log(err));
    //     }


    // }

    useEffect(() => {
        if (loading) {
            axios.get('http://localhost:8000/api/events/' + id)
            .then(res => {
                console.log("user is now0");
                console.log(user);
                setEvent(formatEvents(res.data));
                // console.log(res.data.creator);
                return axios.get('http://localhost:8000/api/users/' + res.data.creator)
            })
            .then(res => {
                console.log("creator");
                console.log(res.data ? "true" : "false");
                setCreator(res.data);
                setLoading(false);
            })

        }
    }, [user])


    const formatEvents = (eventParam) => {
        // console.log("ran this")
        if (user === null) {
            return;
        }


        // console.log("running this");
        let tempEvent = {
                        ...eventParam,
                        eventDate: new Date(eventParam.eventDate).toLocaleDateString("en", { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }),
                        startTime: new Date(eventParam.startTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: true, timeZone: 'America/Los_Angeles' }),
                        endTime: new Date(eventParam.endTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: true, timeZone: 'America/Los_Angeles' }),
                        liked: (eventParam._id in user.savedEvents)
                    };
        // console.log(tempEvent);
        return tempEvent;

    }

    const toggleLiked = (e) => {
        // console.log(i);

        let tempUser = JSON.parse(JSON.stringify(user));
        let userSavedEvents = JSON.parse(JSON.stringify(user.savedEvents));


        if (event.liked) {
            delete userSavedEvents[event._id];
        }
        else {
            userSavedEvents[event._id] = event.name;
        }
        event.liked = !event.liked;
        tempUser.savedEvents = userSavedEvents;

        if (user) {
            axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, tempUser)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => { console.error(err) });
        }
        setUser(tempUser);
    };

    return (
        <div>
            {/* <div className="container"> */}
            {/* <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in"> */}
            <div className="vh-100">
                <div className="container py-5 h-100 fade-in">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-9 col-lg-8 col-xl-8">
                            {!user || !event ?
                                (<ScaleLoader size={100} color="white" loading={loading || !user  || !event} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                                :
                                (
                                    <div className="fade-in card scroll-box" style={{ borderRadius: "15px", backgroundColor: "#ffffff", overflowY: "scroll", maxHeight: "93vh" }}>
                                        <div className="card-body p-4 text-black">
                                            <div className="d-flex align-items-center mb-4 justify-content-between">
                                                <div className="d-flex userName align-items-center">
                                                    <div className="">
                                                        <Avatar sx={{ bgcolor: blue[500] }}>
                                                            <EventIcon />
                                                        </Avatar>
                                                    </div>
                                                    <div className="d-flex flex-column ms-3">
                                                        <div className="">
                                                            <h4 className="mb-0">{event.name}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="div">
                                                    <i className={`bi bi-bookmark${event.liked ? "-fill" : ""} nav-icon`} onClick={(e) => toggleLiked(e)}></i>
                                                </div>


                                            </div>
                                            <hr />
                                            <div className="row my-4">
                                                <div className="col-sm-3">
                                                    <p className="text-muted mb-0">Location</p>
                                                </div>
                                                <div className="col-sm-9" onClick={() => window.location.replace(`https://www.google.com/maps/search/${event.place}`)} style={{cursor : "pointer"}}>
                                                    <p className="text-primary">{event.place}</p>
                                                </div>
                                            </div>

                                            <div className="row my-4">
                                                <div className="col-sm-3">
                                                    <p className="text-muted mb-0">Date</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p>{event.eventDate}</p>
                                                </div>
                                            </div>


                                            <hr className="mt-0 mb-4" />
                                            <div className="pt-1 d-flex justify-content-around flex-wrap" >

                                                <div className="mb-3">
                                                    <h6 className="text-muted">Start Time</h6>
                                                    <p>{event.startTime}</p>
                                                </div>
                                                <div className="mb-3">
                                                    <h6 className="text-muted">End Time</h6>
                                                    <p>{event.endTime}</p>
                                                </div>
                                            </div>

                                            
                                            <div className="row mt-4 mb-2">
                                                <div className="col-sm-3">
                                                    <p className="text-muted mb-0">Description</p>
                                                </div>
                                            </div>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="mb-3">
                                                    <p>{event.description}</p>
                                                </div>
                                            </div>

                                            {creator && Object.keys(creator).length > 0 ? <>
                                                <div className="row mt-4 mb-2">
                                                    <div className="col-sm-3">
                                                        <p className="text-muted mb-0">Created By</p>
                                                    </div>
                                                </div>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="mb-3">
                                                        <div className="d-flex text-wrap justify-content-center" >

                                                            <ListItem className="live-search-list" sx={{}}
                                                                disablePadding
                                                            >
                                                                <ListItemButton sx={{ py: 2 }} onClick={() => { navigate(`/users/${creator._id}`) }}>
                                                                    <ListItemAvatar>
                                                                        <Avatar sx={{ bgcolor: creator.avatarColor }}>
                                                                            <AvatarIcon iconValue={creator.avatarIcon} />
                                                                        </Avatar>
                                                                    </ListItemAvatar>
                                                                    <ListItemText primary={<h6 className="mb-0">{creator.nickname}<em className="text-muted"> (@{creator.username})</em></h6>} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <div className="d-flex align-items-center justify-content-end w-sm-50 w-md-50 w-lg-50 text-wrap flex-wrap">
                                                                <div>
                                                                    <p id="profile-major-year-text" className="mb-0 me-2">{creator?.year[1]} <br /><em className="text-muted ">{creator?.major}</em></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </> : <></>}







                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default EventPage;