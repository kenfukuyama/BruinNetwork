import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';

import ScaleLoader from 'react-spinners/ScaleLoader';
// import IconButton from '@mui/material/IconButton';
import { LoggedinContext } from '../context/LoggedinContext';



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
import { useNavigate } from 'react-router-dom';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Button from '@mui/material/Button';

import FriendsNavigation from '../components/FriendsNavigation';

import AvatarIcon from '../components/AvatarIcon';

const MyFriends = () => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);
    const { loggedinInfo } = useContext(LoggedinContext);
    const [inviationCounts, setInviationCounts] = useState(0);

    const friendsRef = useRef(null);
    const [query, setQuery] = useState("");


    useEffect(() => {
        axios.post("http://localhost:8000/api/friendships/approved", { userId: loggedinInfo.loggedinId })
            .then(res => {
                // console.log(res.data);
                friendsRef.current = res.data;
                setFriends(res.data);
            })
            .finally(() => { setLoading(false); })



        axios.post("http://localhost:8000/api/friendships/waiting", { userId: loggedinInfo.loggedinId })
            .then(res => {
                setInviationCounts(res.data.length);
            })

    }, [loggedinInfo.loggedinId]);

    const search = (e) => {
        setQuery(e.target.value);
        let query = e.target.value.toString().toLowerCase();
        setFriends(friendsRef.current.filter(user => {
            let target = user.username.toString().toLowerCase();
            let target1 = user.nickname.toString().toLowerCase();
            let target2 = user.year[1].toString().toLowerCase();
            let target3 = user.major.toString().toLowerCase();
            return (target.includes(query) || target1.includes(query) || target2.includes(query) || target3.includes(query));
        }));
    }


    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-9 col-lg-8 col-xl-8">
                        {loading ?
                            (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                                <div className="card fade-in px-2 scroll-box" style={{ borderRadius: "15px", backgroundColor: "rgba(25, 138, 209, 0.55)", overflowY: "scroll", height: "93vh" }}>
                                    <div className="p-4 text-black" >
                                        <FriendsNavigation inviationCounts={inviationCounts} />
                                    </div>
                                    <div className="d-flex align-item-center justify-content-center mb-3">
                                        <Button color="primary" variant="contained" id="navButton" startIcon={<PeopleAltIcon />}>Friends</Button>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <div className="input-group search-bar p-4 w-md-75 w-lg-100">
                                            <input type="text"
                                                className="form-control rounded live-search-box"
                                                placeholder="Search Friends"
                                                aria-label="Search People"
                                                aria-describedby="search-addon"
                                                onChange={e => { search(e) }}
                                                value={query}
                                            />
                                        </div>
                                    </div>

                                    {friends.length > 0 ? <>
                                        <div className="d-flex justify-content-center flex-wrap">
                                            <List dense sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "15px" }}>
                                                {friends.map((user, i) => {
                                                    const labelId = `checkbox-list-secondary-label-${i}`;
                                                    return (
                                                        <div className="d-flex text-wrap justify-content-center" key={i}>
                                                        <ListItem sx={{ px: 2 }}
                                                            key={i}
                                                            disablePadding
                                                        >
                                                            <ListItemButton sx={{ py: 2 }} onClick={() => { nav(`/users/${user._id}`) }}>
                                                                <ListItemAvatar>
                                                                    <Avatar sx={{ bgcolor: user.avatarColor }}>
                                                                        <AvatarIcon iconValue={user.avatarIcon} />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText id={labelId} primary={<h6 className="mb-0">{user.nickname}<em className="text-muted"> (@{user.username})</em></h6>} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                        <div className="d-flex align-items-center justify-content-end w-sm-50 w-md-50 w-lg-50 text-wrap flex-wrap">
                                                                <div>
                                                                    <p id="profile-major-year-text" className="mb-0 me-3">{user.year[1]} <br /><em className="text-muted ">{user.major}</em></p>
                                                                </div>

                                                            </div>


                                                        </div>

                                                    );
                                                })}
                                            </List>
                                        </div>




                                    </> : <></>}



                                </div>
                            )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyFriends;


 // <p id="profile-major-year-text" className="mb-0 text-right pe-3 text-wrap">{user.year[1]} <br /><em className="text-muted">{user.major}</em></p>