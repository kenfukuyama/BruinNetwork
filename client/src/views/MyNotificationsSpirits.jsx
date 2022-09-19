import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';

import ScaleLoader from 'react-spinners/ScaleLoader';
// import IconButton from '@mui/material/IconButton';
import {LoggedinContext} from '../context/LoggedinContext';
import AvatarIcon from '../components/AvatarIcon';



// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import Diversity2Icon from '@mui/icons-material/Diversity2';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


// user list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { blue } from '@mui/material/colors';
// import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';


import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import ClearAllIcon from '@mui/icons-material/ClearAll';


import WhatshotIcon from '@mui/icons-material/Whatshot';
import NotificationsNavigation from '../components/NotificationsNavigation';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';

// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const MyNotificationsSpirits = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [spiritsNotifications, setSpiritsNotifications] = useState([]);
    const {loggedinInfo} = useContext(LoggedinContext);
    const [spiritCount, setSpiritCount] = useState(null);
    const [inviationCounts, setInviationCounts] = useState(0);


    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
        .then(res => {
            console.log(res.data);
            setSpiritCount(res.data.spiritsCount);
            setSpiritsNotifications(res?.data?.spiritsNotifications?.reverse());
        })
        .finally(() => {setLoading(false);})

        // get all friends
        axios.post("http://localhost:8000/api/friendships/waiting", {userId : loggedinInfo.loggedinId})
        .then(res => {
            setInviationCounts(res.data.length); 
        })


    }, [loggedinInfo.loggedinId]);

    const clearNotifications = (e, i) => {
        let tempArr = spiritsNotifications.filter((notification, idx) => idx !== i);
        setSpiritsNotifications(tempArr);
        axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, {_id : loggedinInfo.loggedinId, spiritsNotifications : tempArr})
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => { console.error(err) });
    }

    const clearAll = () => {
        console.log("clikced")
        setSpiritsNotifications([]);
        axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, {_id : loggedinInfo.loggedinId, spiritsNotifications : []})
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => { console.error(err) });
    }


    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-9 col-lg-8 col-xl-8">
                        {loading || !spiritsNotifications ?
                            (<ScaleLoader size={100} color="white" loading={loading || !spiritsNotifications} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                                <div className="card fade-in px-2 pt-4" style={{ borderRadius: "15px", backgroundColor: "rgba(25, 138, 209, 0.55)", overflowY : "scroll" , height: "93vh"}}>
                                    <div className="p-4 text-black" >
                                        <NotificationsNavigation spiritsGivenCounts={spiritsNotifications.length} inviationCounts={inviationCounts}/>
                                    </div>
                                    <div className="d-flex align-item-center justify-content-center mb-3 gap-2">
                                        <Button color="warning" variant="contained" id="navButton" startIcon={<WhatshotIcon />}>SPIRITS</Button>
                                        <Button  onClick={clearAll} style={{color : "#888888"}} startIcon={<ClearAllIcon style={{color : "#888888"}} />} >CLEAR ALL</Button>
                                    </div>

                                    <div className="d-flex align-item-center justify-content-center mb-3">
                                        <Button color="primary" variant="contained" id="navButton" startIcon={<EmojiEventsIcon />}>{spiritCount} SPIRIT{spiritCount > 0 ? "S" : ""}</Button>
                                    </div>

                                    <div className="d-flex justify-content-center flex-wrap">
                                        <List dense sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "15px"}}>
                                            {spiritsNotifications.map((notification, i) => {
                                                const labelId = `checkbox-list-secondary-label-${i}`;
                                                return ( 
                                                    <ListItem sx={{px : 2}}
                                                        key={i}
                                                        secondaryAction={
                                                            <div>
                                                                <IconButton onClick={(e) => {
                                                                    clearNotifications(e, i);
                                                                    // setrequestingFriends(requestingfriends.filter((eachUser) => eachUser._id !== user._id))
                                                                    // let tempCount = inviationCounts;
                                                                    // setInviationCounts(--tempCount);
                                                                
                                                                }}>
                                                                    <CheckIcon fontSize="medium" />
                                                                </IconButton>
                                                            </div>
                                                        }
                                                    >
                                                        <ListItemButton  sx={{py : 2}} onClick={() => {navigate(`/users/${notification?.userId}`)}}>
                                                            <ListItemAvatar>
                                                                <Avatar sx={{ bgcolor: notification.avatarColor }}>
                                                                    <AvatarIcon iconValue={notification.avatarIcon} />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={
                                                                <h6 className={`mb-0 ${notification.clapValue === 8 ? "text-primary" :  ""}`}>{notification.nickname}
                                                                    <em> (@{notification.username})</em> gave you 
                                                                    {notification.clapValue === 8 ? " 8 Claps" : " a 4's Up"}!
                                                                </h6>} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </div>


                                </div>
                            )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyNotificationsSpirits;
