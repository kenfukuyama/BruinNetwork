import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {LoggedinContext} from '../context/LoggedinContext';
import axios from 'axios';
import { useContext, useEffect } from 'react'

import ScaleLoader from 'react-spinners/ScaleLoader';

import AvatarIcon from '../components/AvatarIcon';

// user list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { blue } from '@mui/material/colors';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';




// import WhatshotIcon from '@mui/icons-material/Whatshot';
import NotificationsNavigation from '../components/NotificationsNavigation';
// import ClearAllIcon from '@mui/icons-material/ClearAll';

const MyFriendsPending = () => {
    const nav = useNavigate();
    const {loggedinInfo} = useContext(LoggedinContext);

    const [loading1, setLoading1] = useState(true);
    const [requestingfriends, setrequestingFriends] = useState([]);
    const [loading2, setLoading2] = useState(true);
    const [inviationCounts, setInviationCounts] = useState(0);
    const [spiritsNotifications, setSpiritsNotifications] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
        .then(res => {
            // console.log(res.data);
            setSpiritsNotifications(res?.data?.spiritsNotifications?.reverse());
        })
        .finally(() => {setLoading1(false);})


        axios.post("http://localhost:8000/api/friendships/waiting", {userId : loggedinInfo.loggedinId})
        .then(res => {
            // console.log(res.data);
            setrequestingFriends(res.data);
            setInviationCounts(res.data.length); 
            
        })
        .finally(() => {setLoading2(false);})

    }, [loggedinInfo.loggedinId]);



    const connect = (id) => {
        axios.post('http://localhost:8000/api/friendships/connect', {requesterId:loggedinInfo.loggedinId, recipientId: id})
    }

    const disconnect = (id) => {
        axios.post('http://localhost:8000/api/friendships/disconnect', {requesterId:loggedinInfo.loggedinId, recipientId: id})
    }


    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-9 col-lg-8 col-xl-8">
                        {loading1 || loading2  ?
                            (<ScaleLoader size={100} color="white" loading={loading1 || loading2} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                                <div className="card fade-in px-2 pt-4" style={{ borderRadius: "15px", backgroundColor: "rgba(25, 138, 209, 0.55)", overflowY : "scroll" , height: "93vh"}}>
                                    <div className="p-4 text-black" >
                                        <NotificationsNavigation spiritsGivenCounts={spiritsNotifications.length} inviationCounts={inviationCounts}/>
                                    </div>

                                    <div className="d-flex align-item-center justify-content-center mb-3">
                                        <Button color="success"variant="contained" id="navButton" startIcon={<PersonAddIcon />}>Invitations</Button>
                                    </div>

                                    <div className="d-flex justify-content-center flex-wrap">
                                        <List dense sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "15px"}}>
                                            {requestingfriends.map((user, i) => {
                                                const labelId = `checkbox-list-secondary-label-${i}`;
                                                return ( 
                                                    <ListItem sx={{px : 2}}
                                                        key={i}
                                                        disablePadding
                                                        secondaryAction={
                                                            <div>
                                                                <IconButton onClick={(e) => {
                                                                    disconnect(user._id);
                                                                    setrequestingFriends(requestingfriends.filter((eachUser) => eachUser._id !== user._id))
                                                                    let tempCount = inviationCounts;
                                                                    setInviationCounts(--tempCount);
                                                                
                                                                }}>
                                                                    <ClearIcon fontSize="medium" />
                                                                </IconButton>
                                                                <IconButton onClick={(e) => {
                                                                    connect(user._id);
                                                                    setrequestingFriends(requestingfriends.filter((eachUser) => eachUser._id !== user._id));
                                                                    let tempCount = inviationCounts;
                                                                    setInviationCounts(--tempCount);
                                                                }}>
                                                                    <PersonAddAlt1Icon fontSize="medium" />
                                                                </IconButton>

                                                            </div>


                                                                

                                                        }
                                                    >
                                                        <ListItemButton  sx={{py : 3}} onClick={() => {nav(`/users/${user._id}`)}}>
                                                            <ListItemAvatar>
                                                                <Avatar sx={{ bgcolor: user.avatarColor }}>
                                                                    <AvatarIcon iconValue={user.avatarIcon} />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={<h6 className="mb-0">{user.nickname}<em className="text-muted"> (@{user.username})</em></h6>} />
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

export default MyFriendsPending;
