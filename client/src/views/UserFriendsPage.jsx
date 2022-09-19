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
import { useNavigate, useParams } from 'react-router-dom';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Button from '@mui/material/Button';
import AvatarIcon from '../components/AvatarIcon';

const UserFriendsPage = () => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);

    const friendsRef = useRef(null);
    const [query, setQuery] = useState("");

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const { loggedinInfo } = useContext(LoggedinContext);


    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(res => {
                setUser(res.data);
            })

        axios.post("http://localhost:8000/api/friendships/approved", { userId: id })
            .then(res => {
                // console.log(res.data);
                setFriends(res.data);
                friendsRef.current = res.data;
            })
            .finally(() => { setLoading(false); })

    }, [loggedinInfo.loggedinId, id]);


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
                                    <div className="p-4 pb-0 text-black">


                                        {user ?
                                            <div className="d-flex align-items-center mb-4 justify-content-between">
                                                <div className="d-flex userName  align-items-center">
                                                    <div className="">
                                                        {/* <img src=""
                                                                    alt="Generic placeholder image" className="img-fluid rounded-circle border border-dark border-3"
                                                                style={{width: "70px"}}/> */}
                                                        <Avatar sx={{ bgcolor: user.avatarColor }}>
                                                            <AvatarIcon iconValue={user.avatarIcon} />
                                                        </Avatar>
                                                    </div>
                                                    <div className="d-flex flex-column ms-3 text-white">
                                                        <div className="">
                                                            <h4 className="mb-0">{user.nickname} </h4>
                                                        </div>
                                                        <div className="">
                                                            <p className="mb-0">@{user.username}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button className="btn btn-outline-info" onClick={(e) => (nav(`/users/${id}`))}>
                                                    View Profile
                                                </button>
                                            </div> : <></>
                                        }

                                        <div className="d-flex justify-content-center">
                                            <div className="input-group search-bar p-4 w-md-75 w-lg-100">
                                                <input type="text"
                                                    className="form-control rounded live-search-box regular"
                                                    placeholder="Search Friends"
                                                    aria-label="Search People"
                                                    aria-describedby="search-addon"
                                                    onChange={e => { search(e) }}
                                                    value={query}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="d-flex align-item-center justify-content-center mb-3">
                                        <Button color="success" variant="contained" id="navButton" startIcon={<PeopleAltIcon />}>Friends</Button>
                                    </div>

                                    <div className="d-flex justify-content-center flex-wrap">
                                        <List dense sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "15px" }}>
                                            {friends.map((user, i) => {
                                                const labelId = `checkbox-list-secondary-label-${i}`;
                                                return (
                                                    <ListItem sx={{ px: 2 }}
                                                        key={i}
                                                        disablePadding
                                                        secondaryAction={
                                                            // <Checkbox
                                                            //     edge="end"
                                                            //     inputProps={{ 'aria-labelledby': labelId }}
                                                            // />
                                                            <p id="profile-major-year-text" className="mb-0 text-right pe-3">{user.year[1]} <br /><em className="text-muted">{user.major}</em></p>

                                                        }
                                                    >
                                                        <ListItemButton sx={{ py: 3 }} onClick={() => { nav(`/users/${user._id}`) }}>
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

export default UserFriendsPage;
