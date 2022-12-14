import axios from 'axios';
import React, { useContext } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import ScaleLoader from 'react-spinners/ScaleLoader';
import FriendsNavigation from '../components/FriendsNavigation';


import Button from '@mui/material/Button';
import ExploreIcon from '@mui/icons-material/Explore';

import { LoggedinContext } from '../context/LoggedinContext';

// user list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { blue} from '@mui/material/colors';
import AvatarIcon from '../components/AvatarIcon';
import { useNavigate } from 'react-router-dom';




const Users = () => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(true);
    const { loggedinInfo } = useContext(LoggedinContext);
    // const [users, setUsers] = useState(true);
    const usersRef = useRef(null);

    const [users, setUsers] = useState(null);

    const [inviationCounts, setInviationCounts] = useState(0);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/api/users', { withCredentials: true })
            .then((res) => {
                // console.log(res.data);
                usersRef.current = res.data;
                setUsers(res.data);
            })
            .finally(() => { setLoading(false); });

        axios.post("http://localhost:8000/api/friendships/waiting", { userId: loggedinInfo.loggedinId })
            .then(res => {
                setInviationCounts(res.data.length);
            })


    }, [loggedinInfo.loggedinId])



    const search = (e) => {
        setQuery(e.target.value);
        let query = e.target.value.toString().toLowerCase();
        setUsers(usersRef.current.filter(user => {
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
                        {!users ?
                            (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                                <div className="card fade-in px-2 scroll-box" style={{ borderRadius: "15px", backgroundColor: "rgba(25, 138, 209, 0.55)", overflowY: "scroll", height: "93vh" }}>
                                    <div className="p-4 text-black" >
                                        <FriendsNavigation inviationCounts={inviationCounts} />
                                    </div>
                                    <div className="d-flex align-item-center justify-content-center mb-3">
                                        <Button color='success' variant="contained" id="navButton" startIcon={<ExploreIcon />}>Explore People</Button>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className="input-group search-bar p-4 w-md-75 w-lg-100">
                                            <input type="text"
                                                className="form-control rounded live-search-box"
                                                placeholder="Search people by nickname, username, major, year ..."
                                                aria-label="Search People"
                                                aria-describedby="search-addon"
                                                onChange={e => { search(e) }}
                                                value={query}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center flex-wrap text-wrap">
                                        {users.length > 0 ? <>
                                            <List className="text-wrap pe-3" dense sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "15px" }}>
                                                {users.map((user, i) => {
                                                    const labelId = `checkbox-list-secondary-label-${i}`;
                                                    return (

                                                        <div className="d-flex text-wrap justify-content-center" key={i}>

                                                            <ListItem className="live-search-list" sx={{}}
                                                                key={i}
                                                                disablePadding
                                                            // secondaryAction={
                                                            //     // <Checkbox
                                                            //     //     edge="end"
                                                            //     //     inputProps={{ 'aria-labelledby': labelId }}
                                                            //     // />
                                                            // }
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
                                                                    <p className="mb-0 text-right pe-3 text-primary ">{user.spiritsCount ? <>{user.spiritsCount}<i className={`bi bi-award${user.spiritsCount >= 800 ? "-fill" : ""} nav-icon`}></i></> : ""} </p>
                                                                </div>
                                                                <div>
                                                                    <p id="profile-major-year-text" className="mb-0 me-2">{user.year[1]} <br /><em className="text-muted ">{user.major}</em></p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </List>



                                        </> : <></>}


                                    </div>


                                </div>
                            )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users;
