import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {LoggedinContext} from '../context/LoggedinContext';
import axios from 'axios';
import { useContext, useEffect } from 'react'

import ScaleLoader from 'react-spinners/ScaleLoader';

import FriendsNavigation from '../components/FriendsNavigation';


// user list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { blue } from '@mui/material/colors';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';

import PendingIcon from '@mui/icons-material/Pending';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const MyFriendsPending = () => {
    const nav = useNavigate();
    const {loggedinInfo} = useContext(LoggedinContext);

    const [pendingfriends, setPendingFriends] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [requestingfriends, setrequestingFriends] = useState([]);
    const [loading2, setLoading2] = useState(true);
    const [inviationCounts, setInviationCounts] = useState(0);


    useEffect(() => {
        axios.post("http://localhost:8000/api/friendships/pending", {userId : loggedinInfo.loggedinId})
        .then(res => {
            // console.log(res.data);
            setPendingFriends(res.data);
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
                                <div className="card fade-in px-2" style={{ borderRadius: "15px", backgroundColor: "rgba(25, 138, 209, 0.55)", overflowY : "scroll" , height: "93vh"}}>
                                    <div className="p-4 text-black">
                                        <div className="d-flex justify-content-center">
                                            <div className="input-group search-bar p-4 w-md-75 w-lg-100">
                                                <input type="text" className="form-control rounded live-search-box regular" placeholder="Search People" aria-label="Search People"
                                                    aria-describedby="search-addon" />
                                                <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
                                            </div>
                                        </div>
                                        <FriendsNavigation  inviationCounts={inviationCounts}/>
                                    </div>


                                    <div className="d-flex align-item-center justify-content-center mb-3">
                                        <Button color="warning"variant="contained" id="navButton" startIcon={<PersonAddIcon />}>Invitations</Button>
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
                                                                <Avatar sx={{ bgcolor: blue[500] }}>
                                                                    <AccountCircleIcon />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={<h6 className="mb-0">{user.nickname}<em className="text-muted"> (@{user.username})</em></h6>} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </div><div className="d-flex align-item-center justify-content-center my-3">
                                        <Button color="info"variant="contained" id="navButton" startIcon={<PendingIcon />}>Pending</Button>
                                    </div>

                                    <div className="d-flex justify-content-center flex-wrap">
                                        <List dense sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "15px"}}>
                                            {pendingfriends.map((user, i) => {
                                                const labelId = `checkbox-list-secondary-label-${i}`;
                                                return ( 
                                                    <ListItem sx={{px : 2}}
                                                        key={i}
                                                        disablePadding
                                                        secondaryAction={
                                                            <IconButton onClick={(e) => {
                                                                disconnect(user._id);
                                                                setPendingFriends(pendingfriends.filter((eachUser) => eachUser._id !== user._id));

                                                            }}>
                                                                <RemoveCircleIcon fontSize="medium" />
                                                            </IconButton>
                                                                // <div className="">
                                                                //     <p id="profile-major-year-text-notification" className="mb-0 text-right pe-2 pb-0">{user.year[1]} <br/><em className="text-muted">{user.major}</em></p>
                                                                //     <button className='btn btn-secondary float-right' onClick={(e) => {disconnect(user._id);}}><i className="bi bi-person-x"/></button>
                                                                // </div>

                                                        }
                                                    >
                                                        <ListItemButton  sx={{py : 2}} onClick={() => {nav(`/users/${user._id}`)}}>
                                                            <ListItemAvatar>
                                                                <Avatar sx={{ bgcolor: blue[500] }}>
                                                                    <AccountCircleIcon />
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
