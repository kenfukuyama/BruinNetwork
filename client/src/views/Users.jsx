import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

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
import { useNavigate } from 'react-router-dom';


const Users = () => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(true);
    // const [users, setUsers] = useState(true);
    const users = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users', {withCredentials: true})
        .then((res) => {
            // console.log(res.data);
            users.current = res.data;
        })
        .finally(() => {setLoading(false);});
        
    }, [])



    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-9 col-lg-7 col-xl-5">
                        {!users.current ?
                            (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                                <div className="card" style={{ borderRadius: "15px", backgroundColor: "#ffffff" }}>
                                    <div className="card-body p-4 text-black">
                                        <div className="d-flex justify-content-center">
                                            <div className="input-group search-bar p-4 w-md-75 w-lg-100">
                                                <input type="text" className="form-control rounded live-search-box regular" placeholder="Search People" aria-label="Search People"
                                                    aria-describedby="search-addon" />
                                                <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
                                            </div>
                                        </div>
                                        <FriendsNavigation/>
                                    </div>
                                    <div className="d-flex justify-content-center flex-wrap">
                                        <List dense sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "15px"}}>
                                            {users.current.map((user, i) => {
                                                const labelId = `checkbox-list-secondary-label-${i}`;
                                                return ( 
                                                    <ListItem sx={{px : 2}}
                                                        key={i}
                                                        disablePadding
                                                        secondaryAction={
                                                            // <Checkbox
                                                            //     edge="end"
                                                            //     inputProps={{ 'aria-labelledby': labelId }}
                                                            // />
                                                                <p id="profile-major-year-text" className="mb-0 text-right pe-3">{user.year[1]} <br/><em class="text-muted">{user.major}</em></p>

                                                        }
                                                    >
                                                        <ListItemButton  sx={{py : 3}} onClick={() => {nav(`/users/${user._id}`)}}>
                                                            <ListItemAvatar>
                                                                <Avatar sx={{ bgcolor: blue[500] }}>
                                                                    <AccountCircleIcon />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={<h6 className="mb-0">{user.nickname}<em class="text-muted"> (@{user.username})</em></h6>} />
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

export default Users;
