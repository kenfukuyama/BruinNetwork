

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import {
    Switch,
    FormGroup,
    FormControlLabel,
} from '@material-ui/core';

import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import { createTheme, ThemeProvider} from '@mui/material/styles';



const MyUserAccount = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [updated, setUpdated] = useState(false);
    const { loggedinInfo } = useContext(LoggedinContext);
    const [interest, setInterest] = useState("");
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            white: {
                main: '#ffffff',
            }
        }
    });



    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }



        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
            .then(res => {
                // console.log(res.data);
                setUser(res.data);
                setLoading(false);
            })

    }, [loggedinInfo.loggedin, loggedinInfo.loggedinId, navigate])


    const updateUser = (e) => {
        axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user)
                    .then(res => {
                        console.log(res.data);
                        setUpdated(true);
                    })
                    .catch(err => { console.error(err) });
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }


    const handleContact = (e, i) => {
        // deep copy
        let tempContacts = JSON.parse(JSON.stringify(user.contacts)); 

        // console.log(tempContacts[i][0]);
        tempContacts[i][0] = e.target.value;
        setUser({ ...user, contacts : tempContacts});
    }

    const handleContactVisiblity = (e, i)  => {
        let tempContacts = JSON.parse(JSON.stringify(user.contacts)); 
        tempContacts[i][1] = !tempContacts[i][1]
        setUser({ ...user, contacts : tempContacts});
    }

    const handleInterestSubmit = (e) => {
        // TODO only allows up to 7 interests
        let obj = {};
        obj[interest] = 1;
        let tempUser = { ...user, interests: { ...user.interests, ...obj } };
        setUser(tempUser);
        setInterest("");
    }

    const deleteInterest = (e, value) => {
        let tempInterest = JSON.parse(JSON.stringify(user.interests));
        delete tempInterest[value];
        let tempUser = { ...user, interests: tempInterest };
        setUser(tempUser);
    }






    return (
        <div className="vh-100">
            <div className="container py-5 fade-in align-items-center">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col col-md-9 col-lg-7 col-xl-5">
                        {!user ?
                            (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                                <div className="card bg-transparent">
                                    <h4 className="card-header p-4 text-white">{user.nickname} <em><small>(@{user.username})</small></em></h4>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <label className="form-label text-white">nickname</label><br />
                                            <input
                                                type="text"
                                                placeholder='nickname'
                                                name="nickname"
                                                value={user.nickname}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label text-white">year</label><br />
                                            <input
                                                type="text"
                                                placeholder='year'
                                                name="year"
                                                value={user.year}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label text-white">major</label><br />
                                            <input
                                                type="text"
                                                placeholder='major'
                                                name="major"
                                                value={user.major}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>

                                        <div className="mb-2">
                                            <label className="form-label text-white">bio</label><br />
                                            <textarea
                                                placeholder='Bio'
                                                name="bio"
                                                value={user.bio}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>

                                        <div className="d-flex gap-3 justify-content-center">
                                            <div className="mb-3">
                                                <label className="form-label text-white">Contact 1</label><br />
                                                <input
                                                    type="text"
                                                    value={user.contacts[0][0]}
                                                    onChange={(e) => (handleContact(e, 0))}
                                                    className="form-control mb-1" />
                                                <div className="d-flex justify-content-center">
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch checked={user.contacts[0][1]} size="small" onChange={e => handleContactVisiblity(e, 0)} />} label={user.contacts[0][1] ? "Public" : "Friends Only"} labelPlacement="bottom" />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-white">Contact 2</label><br />
                                                <input
                                                    type="text"
                                                    value={user.contacts[1][0]}
                                                    onChange={(e) => (handleContact(e, 1))}
                                                    className="form-control mb-1" />
                                                <div className="d-flex justify-content-center">
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch checked={user.contacts[1][1]} size="small" onChange={e => handleContactVisiblity(e, 1)} />} label={user.contacts[1][1] ? "Public" : "Friends Only"} labelPlacement="bottom" />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-white">Contact 3</label><br />
                                                <input
                                                    type="text"
                                                    value={user.contacts[2][0]}
                                                    onChange={(e) => (handleContact(e, 2))}
                                                    className="form-control mb-1" />
                                                <div className="d-flex justify-content-center">
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch checked={user.contacts[2][1]} size="small" onChange={e => handleContactVisiblity(e, 2)} />} label={user.contacts[2][1] ? "Public" : "Friends Only"} labelPlacement="bottom" />
                                                    </FormGroup>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="mb-3">
                                            <label className="form-label text-white">Interests</label><br />
                                            <div className="d-flex justify-content-center gap-3">
                                                <input type="text"
                                                    className="form-control mb-1 w-25"
                                                    value={interest}
                                                    onChange={e => setInterest(e.target.value)}
                                                />
                                                <ThemeProvider theme={theme}>
                                                    <IconButton color="white" aria-label="add to interest" onClick={handleInterestSubmit}>
                                                        <PlaylistAddIcon fontSize="medium" />
                                                    </IconButton>
                                                </ThemeProvider>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2 mb-3 w-100 flex-wrap">
                                            {
                                                Object.keys(user.interests).map((interest, i) => {
                                                    return <Chip label={interest} color="success" onDelete={(e) => deleteInterest(e, interest)} key={i} />
                                                })
                                            }
                                        </div>
                                        <button className="btn btn-primary w-25" onClick={updateUser}>{updated ? "✓ Updated" : "Update"}</button>


                                    </div>
                                </div>
                            )}
                    </div>
                </div>

            </div>

        </div>
    )


}

export default MyUserAccount