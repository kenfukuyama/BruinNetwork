import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';

import Avatar from '@mui/material/Avatar';

import { useRef } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

import Chip from '@mui/material/Chip';
import Collapsible from 'react-collapsible';

import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import AvatarIcon from '../components/AvatarIcon';





const UserPage = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();
    const { loggedinInfo } = useContext(LoggedinContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [friendshipLoading, setFriendshipLoading] = useState(true);
    const [friendshipStatus, setfriendshipStatus] = useState(1);
    const [userSavedEvents, setUserSavedEvents] = useState([]);
    const [friendCount, setFriendCount] = useState(200);

    // const user = useRef(null);
    const [user, setUser] = useState(null);
    const [loggedinUser, setloggedinUser] = useState(null);
    // const friendshipStatus = useRef(1);
    const publicContacts = useRef([]);
    const privateContacts = useRef([]);
    // const [created, setCreated] = useState(false);

    // * anchor
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popper' : undefined;


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8000/api/users/' + id)
            .then(res => {
                setUser(res.data);
                // console.log(res.data.spirits);


                for (let i = 0; i < res.data.contacts.length; i++) {
                    if (res.data.contacts[i][1] && (res.data.contacts[i][0])) {
                        (publicContacts.current).push((res.data.contacts[i][0]));
                    }
                }

                for (let i = 0; i < res.data.contacts.length; i++) {
                    if (res.data.contacts[i][0]) {
                        (privateContacts.current).push((res.data.contacts[i][0]));
                    }
                }

                // console.log( publicContacts.current)
                // setOtherUser(res.data);
                // console.log(otherUser);
                // setOtherUserLoading(false);
                setLoading(false);
            })
            .finally(() => setLoading(false));


        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
            .then(res => {
                setloggedinUser(res.data);
                setLoading(false);
            })
            .finally(() => setLoading(false));


        axios.post('http://localhost:8000/api/friendships/', { requesterId: loggedinInfo.loggedinId, recipientId: id })
            .then(res => {
                if (res.status === 200) {


                    if (res.data.isApproved) {
                        // * they are friends
                        // console.log("they are friends");
                        setfriendshipStatus(2);
                    }
                    else if (res.data.recipient === loggedinInfo.loggedinId) {
                        // console.log("you have request");
                        setfriendshipStatus(3);
                    }
                    else {
                        // console.log("you sent the request");
                        setfriendshipStatus(4);
                    }
                    // console.log(friendshipStatus.current);
                }
                else {
                    // console.log("not found");
                    setfriendshipStatus(1);
                }
                // console.log(friendshipStatus.current);
                setFriendshipLoading(false);
            })
            .catch(err => { })
            .finally(() => setFriendshipLoading(false));


        axios.post("http://localhost:8000/api/friendships/approved", { userId: id })
            .then(res => {
                setFriendCount(res.data.length);
            })




        //!  dismoutn return
        // return () => {
        //     if (loggedinUser) {
        //         axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, loggedinUser)
        //             .then(res => {
        //                 console.log(res.data);
        //             })
        //             .catch(err => { console.error(err) });
        //     }

        // };

     // eslint-disable-next-line 
    }, [loggedinInfo.loggedin, id, navigate, loggedinInfo.loggedinId])


    useEffect(() => {
        /// get all the events crated by the user.
        axios.get('http://localhost:8000/api/users/' + id + "/saved-events")
            // axios.get("api/events/user/6317f12d985af7817efe4bc9")
            .then(res => {
                // console.log("running this");
                // console.log(res.data);
                setUserSavedEvents(formatEvents(res.data));
                // console.log(userSavedEvents.current
            })
        // .catch( err => console.log(err))s

        // eslint-disable-next-line
    }, [user, id])



    const connect = () => {
        axios.post('http://localhost:8000/api/friendships/connect', { requesterId: loggedinInfo.loggedinId, recipientId: id })
    }

    const disconnect = () => {
        axios.post('http://localhost:8000/api/friendships/disconnect', { requesterId: loggedinInfo.loggedinId, recipientId: id })
    }



    useEffect(() => {
        getSavedEvents();
    // eslint-disable-next-line
    }, [user])
    // saved events handler

    const getSavedEvents = () => {
        // only make a api when it does not exist yet
        /// get all the events crated by the user.

        if (!userSavedEvents) {
            axios.get('http://localhost:8000/api/users/' + user._id + "/saved-events")
                // axios.get("api/events/user/6317f12d985af7817efe4bc9")
                .then(res => {
                    setUserSavedEvents(formatEvents(res.data));
                    // console.log(userSavedEvents.current);
                })
                .catch(err => {});
        }
        // console.log("ran there");

    }
    


    const formatEvents = (paramEvents) => {
        if (loggedinUser === null) {
            return;
        }

        let tempFormattedEvents = paramEvents.map((event, i) => {
            if (event.startTime && event.endTime && event.eventDate) {
                return {
                    ...event,
                    eventDate: new Date(event.eventDate).toLocaleDateString("en", { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }),
                    startTime: new Date(event.startTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: true, timeZone: 'America/Los_Angeles' }),
                    endTime: new Date(event.endTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: true, timeZone: 'America/Los_Angeles' }),
                    liked: (event._id in loggedinUser.savedEvents)
                };
            }
            else {
                return { ...event };
            }
        });
        return tempFormattedEvents;

    }

    const toggleLiked = (e, i) => {
        // console.log(i);

        let tempLoggedInUser = JSON.parse(JSON.stringify(loggedinUser));
        let tempEvents = userSavedEvents.map((eachEvent, idx) => {
            if (idx === i) {
                // not liked
                if (!eachEvent.liked) {
                    // console.log("add to user event list");
                    let obj = {};
                    obj[eachEvent._id] = eachEvent.name;
                    tempLoggedInUser = { ...tempLoggedInUser, savedEvents: { ...tempLoggedInUser.savedEvents, ...obj } }
                    setloggedinUser(tempLoggedInUser);
                }
                else {
                    // console.log("remove it from the list");
                    delete tempLoggedInUser.savedEvents[eachEvent._id];
                    setloggedinUser(tempLoggedInUser);
                }
                eachEvent.liked = !eachEvent.liked;
            }
            return eachEvent;
        })

        // console.log(loggedinUser);
        if (loggedinUser) {
            axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, tempLoggedInUser)
                .then(res => {
                    // console.log(res.data);
                })
                .catch(err => { console.error(err) });
        }
        setUserSavedEvents(tempEvents);
    };


    const handleSpiritsChange = (clapValue) => {

        // update the current user spirits counts;
        let tempLoggedInUser = JSON.parse(JSON.stringify(loggedinUser));
        tempLoggedInUser.spirits--;
        setloggedinUser(tempLoggedInUser);
        // console.log(tempLoggedInUser);
        // console.log(loggedinInfo.loggedinId)
        if (tempLoggedInUser) {
            axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, tempLoggedInUser)
                .then(res => {
                    // console.log(res.data);
                })
                .catch(err => { console.error(err) });
        }

        // increase the user's sprintCount
        let tempUser = JSON.parse(JSON.stringify(user));
        tempUser.spiritsCount += clapValue;
        tempUser.spiritsNotifications.push({clapValue: clapValue,
            userId: loggedinUser._id,
            username: loggedinUser.username,
            nickname: loggedinUser.nickname,
            time: new Date(),
            avatarColor: loggedinUser.avatarColor,
            avatarIcon : loggedinUser.avatarIcon
        });
        setUser(tempUser);
        if (tempUser) {
            axios.put('http://localhost:8000/api/users/' + id, tempUser)
                .then(res => {
                    // console.log(res.data);
                })
                .catch(err => { console.error(err) });
        }

    };  


    return (
        <div>
            {/* <div className="container"> */}
            {/* <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in"> */}
            <div className="vh-100">
                <div className="container py-5 h-100 fade-in">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-9 col-lg-8 col-xl-8">
                            {!user || !loggedinUser ?
                                (<ScaleLoader size={100} color="white" loading={loading || !user || !loggedinUser} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                                :
                                (
                                    <div className="fade-in card" style={{ borderRadius: "15px", backgroundColor: "#ffffff", overflowY: "scroll", maxHeight: "93vh" }}>
                                        <div className="card-body p-4 text-black">
                                            {/* <div>
                                                <h6 className="mb-4">Exquisite hand henna tattoo</h6>
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <p className="small mb-0"><i className="far fa-clock me-2"></i>3 hrs</p>
                                                    <p className="fw-bold mb-0">$90</p>
                                                </div>
                                            </div> */}

                                            {/* // * Avatar ==================================================================== */}
                                            <div className="d-flex align-items-center mb-4 justify-content-between">
                                                <div className="d-flex userName align-items-center">
                                                    <div className="">
                                                        {/* <img src=""
                                                            alt="Generic placeholder image" className="img-fluid rounded-circle border border-dark border-3"
                                                        style={{width: "70px"}}/> */}
                                                        <Avatar sx={{ bgcolor: user.avatarColor }}>
                                                            <AvatarIcon iconValue={user.avatarIcon}/>
                                                        </Avatar>
                                                    </div>
                                                    <div className="d-flex flex-column ms-3">
                                                        <div className="">
                                                            <h4 className="mb-0">{user.nickname}</h4>
                                                        </div>
                                                        <div className="">
                                                            <p className="mb-0">(@{user.username})</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                

                                                <div className="">

                                                    {friendshipLoading || loggedinInfo.loggedinId === id ? <></> :
                                                        <>
                                                            {friendshipStatus === 1 ?
                                                                <button className='btn btn-success' onClick={(e) => { connect(); setfriendshipStatus(4); }}>Connect</button>
                                                                : <>
                                                                    {friendshipStatus === 2 ?
                                                                        <div className="d-flex confirmation gap-2">
                                                                            <button className='btn btn-primary' style={{ pointerEvents: "none" }}><i className="bi bi-person-check-fill" />Friends</button>
                                                                            <button className='btn btn-secondary' onClick={(e) => { disconnect(); setfriendshipStatus(1); }}><i className="bi bi-person-dash" /></button>
                                                                        </div>
                                                                        : <>
                                                                            {
                                                                                friendshipStatus === 3 ?
                                                                                    <div className="d-flex confirmation gap-2">
                                                                                        <button className='btn btn-success' onClick={(e) => { connect(); setfriendshipStatus(2); }}>Confirm</button>
                                                                                        <button className='btn btn-secondary' onClick={(e) => { disconnect(); setfriendshipStatus(1); }}><i className="bi bi-person-x" /></button>
                                                                                    </div>
                                                                                    : <button className='btn btn-secondary' onClick={(e) => { disconnect(); setfriendshipStatus(1); }}>Pending</button>
                                                                            }

                                                                        </>
                                                                    }
                                                                </>

                                                            }
                                                        </>}


                                                </div>
                                            </div>
                                            {/* <hr/> */}
                                            {/* // * Year ==================================================================== */}
                                            <div className="row my-4">
                                                <div className="col-sm-3">
                                                    <p className="text-muted mb-0">Year</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className={`mb-0 ${user.year.length > 1 && user.year[1] ? "" : "text-muted"}`}>{user.year.length > 1 && user.year[1] ? user.year[1] : "No information yet"}</p>

                                                </div>
                                            </div>
                                            {/* <hr/> */}
                                            {/* // * Major ==================================================================== */}
                                            <div className="row my-4">
                                                <div className="col-sm-3">
                                                    <p className="text-muted mb-0">Major</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className={`mb-0 ${user.major ? "" : "text-muted"}`}>{user.major ? user.major : "No information yet"}</p>
                                                </div>
                                            </div>
                                            
                                            {/* // * Bio ==================================================================== */}
                                            <div className="row mt-4 mb-2">
                                                <div className="col-sm-3">
                                                    <p className="text-muted mb-0">Bio</p>
                                                </div>
                                            </div>

                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="mb-3">
                                                    <p className={`${user.bio ? "" : "text-muted"}`}>{user.bio ? user.bio : "No information yet"}</p>
                                                </div>
                                            </div>

                                            {/* // * School sprit ==================================================================== */}
                                            <div className="row my-2 d-flex justify-content-center">
                                                <div className="col-sm-6">
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <div className="spirit">
                                                            <p className="mb-0 text-primary">SPIRITS</p>
                                                        </div>
                                                        <IconButton aria-describedby={popId} onClick={handleClick}>
                                                            <InfoIcon fontSize="small" />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className={`${user.spiritsCount ? "text-primary" : "text-muted"}`}>{user.spiritsCount}</p>

                                                </div>
                                            </div>

                                            {/* // *popper for the spritis */}
                                            <Popper 
                                                id={popId}
                                                open={open}
                                                anchorEl={anchorEl}
                                                placement="left-start"
                                                onClick={handleClick}
                                                modifiers={[
                                                    {
                                                        name: 'flip',
                                                        enabled: true,
                                                        options: {
                                                            altBoundary: true,
                                                            rootBoundary: 'viewport',
                                                            padding: 8,
                                                        },
                                                    },
                                                    {
                                                        name: 'preventOverflow',
                                                        enabled: true,
                                                        options: {
                                                            altAxis: true,
                                                            altBoundary: true,
                                                            tether: true,
                                                            rootBoundary: 'document',
                                                            padding: 8,
                                                        },
                                                    }
                                                ]}>
                                                <Box sx={{ border: 1, pt: 1, px: 1, bgcolor: 'background.paper', width: "200px", borderRadius: "15px", borderColor : "#808080" }}>
                                                    <p className='text-small text-muted text-wrap text-center'>SPIRITS show their school spirits count. <br/> You can give them a <strong>4's up</strong> (increase their count by 4) or <em><strong>8 claps</strong></em> (increase their count by 8, only available for friends).
                                                    You have 5 spirits to give each day.</p>
                                                </Box>
                                                
                                            </Popper>
                                            
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="div">
                                                {friendshipLoading || loggedinInfo.loggedinId === id ? <></> :
                                                    <>

                                                        {friendshipStatus === 2 ?
                                                            <button className={`btn btn-outline-primary ${loggedinUser.spirits > 0 ? "" : "disabled"}`} onClick={(e) => {handleSpiritsChange(8)}}>GIVE 8 CLAPS</button>
                                                            : 
                                                            <button className={`btn btn-outline-success ${loggedinUser.spirits > 0 ? "" : "disabled"}`} onClick={(e) => {handleSpiritsChange(4)}}>GIVE 4'S UP </button>

                                                        }
                                                    </>}
                                                    <p className='form-text text-muted'><em>{loggedinUser.spirits} spirit{loggedinUser.spirits > 1 ? "s" : ""} left</em></p>
                                                </div>                                                
                                            </div>

                                            
                                            {/* // * Contact / Intagram ==================================================================== */}
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="">
                                                    <h6 className="text-muted ms-4" style={{ textAlign: "left" }} >Contact</h6>
                                                </div>

                                                {
                                                    user.instagramUsername ?
                                                        // <div className="d-flex h5 align-items-center justify-content-center gap-2 btn" onClick={(e) => { window.location.replace(`https://www.instagram.com/${user.instagramUsername}`) }}>
                                                        <div className="d-flex h5 align-items-center justify-content-center gap-2 btn">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                                            </svg>
                                                            <div className="div">
                                                                {/* <p className="" style={{ marginBottom: "0px" }}>{user.instagramUsername}</p> */}
                                                                <a href={`https://www.instagram.com/${user.instagramUsername}`} className="text-decoration-none text-dark">{user.instagramUsername}</a>
                                                            </div>
                                                        </div> : <p></p>
                                                }

                                            </div>


                                            {/* // * Contact  ==================================================================== */}
                                            <hr className="mt-0 mb-4" />
                                            <div className="pt-1 d-flex justify-content-around flex-wrap" >
                                                {/* <div className="col-6 mb-3">
                                            <h6>Email</h6>
                                            <p className="text-muted">info@example.com</p>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6>Phone</h6>
                                            <p className="text-muted">123 456 789</p>
                                        </div> */}


                                                {
                                                    friendshipStatus === 2 ?
                                                        <> {
                                                            privateContacts.current.length > 0 ?
                                                                privateContacts.current.map((contact, i) => {
                                                                    return (<div className="mb-3" key={i}>
                                                                        <h6 className="text-muted">Contact {i + 1}</h6>
                                                                        <p>{contact}</p>
                                                                    </div>)
                                                                }) : <div className="mb-3">
                                                                    <p className="text-muted">No information yet</p>
                                                                </div>

                                                        }

                                                        </> : <>
                                                            {
                                                                publicContacts.current.length > 0 ?
                                                                    publicContacts.current.map((contact, i) => {
                                                                        return (<div className="mb-3" key={i}>
                                                                            <h6 className="text-muted">Contact {i + 1}</h6>
                                                                            <p>{contact}</p>
                                                                        </div>)
                                                                    }) : <div className="mb-3">
                                                                        <p className="text-muted">No information yet</p>
                                                                    </div>

                                                            }

                                                        </>

                                                }

                                            </div>

                                            <h6 className="text-muted ms-3" style={{ textAlign: "left" }} >Interests</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">

                                                <div className="d-flex gap-2 mb-3 w-100 flex-wrap justify-content-center">
                                                    {Object.keys(user.interests).length > 0 ?
                                                        Object.keys(user.interests).map((interest, i) => {
                                                            return <Chip label={interest} color="success" key={i} />
                                                        }) : <p className="text-muted">No information yet</p>
                                                    }
                                                </div>
                                            </div>

                                            {/* <p className="my-4 pb-1">52 comments</p>
                                                <button type="button" className="btn btn-success btn-rounded btn-block btn-lg"><i
                                                    className="far fa-clock me-2"></i>Book now</button> */}
                
                                            {/* // * Friend Counts ==================================================================== */}
                                            {
                                                friendCount > 1 ? <button className="text-muted btn mb-2" onClick={() => navigate(`/users/friends/${id}`)}>{friendCount} Friends <i className='bi bi-people-fill nav-icon'></i></button> : ""
                                            }



                                            {/* // * Saved Events ==================================================================== */}
                                            {friendshipStatus === 2 || loggedinInfo.loggedinId === id
                                                ? <Collapsible trigger={<button className="btn pb-0 mb-0 btn-outline-info" onClick={getSavedEvents}>
                                                    <p className="mb-1">See Saved Events <i className="bi bi-chevron-down"></i></p>
                                                </button>
                                                } triggerWhenOpen={<button className="btn pb-0 mb-0" id="btnCollapse">
                                                    <p className="text-muted mb-1"><i className="bi bi-chevron-up"></i></p>
                                                </button>}>

                                                    {userSavedEvents && userSavedEvents.map((event, i) =>
                                                        <div className="row event" key={i}>
                                                            <div className="card m-2 shadow-lg card-border-radius">
                                                                <div className="card-header">
                                                                    <div className="d-flex align-items-center justify-content-between">
                                                                        <div className="event-name" style={{textAlign : "left"}}>
                                                                            <p onClick={() => navigate(`/events/${event._id}`)} className="text-primary h5 " style={{cursor : "pointer"}}>{event.name}</p>
                                                                        </div>
                                                                        <div className="event-time"  style={{textAlign : "right"}}> {event.eventDate} at {event.startTime}</div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center justify-content-end">
                                                                        <div className="event-time">{event.place}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-body">
                                                                    <div className="d-flex  justify-content-between">
                                                                        <div className="">{event.description}  <br /></div>
                                                                        <div className="d-flex gap-1">
                                                                            <i className={`bi bi-bookmark${event.liked ? "-fill" : ""} nav-icon`} onClick={(e) => toggleLiked(e, i)}></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                </Collapsible>
                                                : <>
                                                    <p className="text-muted mb-1">Connect to See Saved Events</p>
                                                </>
                                            }
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

export default UserPage;