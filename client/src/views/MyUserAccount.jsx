

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {blue} from '@mui/material/colors';



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

    const [green, setGreen] = useState("");

    // # extrea configuration
    const theme = createTheme({
        palette: {
            white: {
                main: '#ffffff',
            }
        }
    });

    // # array for years
    const yearChoices = [
                        "1st - Freshman", 
                        "2nd - Sophemore",
                        "3rd - Junior",
                        "4th - Senior",
                        "Grudate - Master",
                        "Graduate - PhD",
                        "Medical Student",
                        "Law Student",
                        "Professor",
                        "Faculty",
                        "Other"]


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
            .then(res => {
                // console.log(res.data);
                setUser(res.data);
                setGreen("success");
            })
            .finally(() => {setLoading(false)});

    }, [loggedinInfo.loggedin, loggedinInfo.loggedinId, navigate])


    const updateUser = (e) => {
        axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user)
                    .then(res => {
                        console.log(res.data);
                        setUpdated(true);
                    })
                    .catch(err => { console.error(err) });
    }


    // ! handle input change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleYearChange = (e) => {

        // selected -1;
        let yearArr;
        if (e.target.value < 0) {
            // return;
            yearArr = ["-1", "" ]

        } else {
            yearArr = [e.target.value, yearChoices[e.target.value]];
        }
        console.log(e.target.value);
        // obj[e.target.value] = yearChoices[e.target.value];
        setUser({...user, year : yearArr})
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

        if (!interest) {
            return;
        }
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
            <div className="container py-5 align-items-center">
                <div className="row d-flex justify-content-center align-items-center mt-4">
                    <div className="col col-md-9 col-lg-7 col-xl-5">
                        {!user || loading || !green ?
                            (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                                <div className="card bg-transparent text-white fade-in" style={{overflowY : "scroll", maxHeight: "93vh"}}>
                                    {/* <h4 className="card-header p-4 text-white">{user.nickname} <em><small>(@{user.username})</small></em></h4> */}
                                    <div className="d-flex align-items-center mb-4 justify-content-between">
                                        <div className="d-flex userName  align-items-center">
                                            <div className="">
                                                {/* <img src=""
                                                            alt="Generic placeholder image" className="img-fluid rounded-circle border border-dark border-3"
                                                        style={{width: "70px"}}/> */}
                                                <Avatar sx={{ bgcolor: blue[500] }}>
                                                    <AccountCircleIcon />
                                                </Avatar>
                                            </div>
                                            <div className="d-flex flex-column ms-3">
                                                <div className="">
                                                    <h4 className="mb-0">{user.nickname} </h4>
                                                </div>
                                                <div className="">
                                                    <p className="mb-0">@{user.username}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-outline-info" onClick = {(e) => (navigate(`/users/${loggedinInfo.loggedinId}`))}>
                                            View Your Profile
                                        </button>
                                    </div>

                                    <div className="card-body">
                                        <div className="mb-2">
                                            <label className="form-label text-white">Nickname</label><br />
                                            <input
                                                type="text"
                                                placeholder='nickname'
                                                name="nickname"
                                                value={user.nickname}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>
                                        {/* <div className="mb-2">
                                            <label className="form-label text-white">Year</label><br />
                                            <input
                                                type="text"
                                                placeholder='year'
                                                name="year"
                                                value={user.year.length > 0 ? yearChoices[user.year[0]] : ""}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div> */}

                                        <div className="mb-2">
                                            <label className="form-label text-white">Year</label><br />
                                            <select className='form-control' onChange={handleYearChange} defaultValue = {user.year[0] === "-1" || !user.year  ? -1 : user.year[0]}>
                                                {/* { user.year[0] == -1 || !user.year ? 
                                                <>
                                                    <option value="-1">Choose Your Year</option>
                                                    { yearChoices.map((year, i) => {
                                                    return <option key={i} value={i}>{year}</option>
                                                    })}
                                                {/* <option value={-1}> No selected yet</option> */}
                                                {/* </> : 
                                                <>
                                                { yearChoices.map((year, i) => {
                                                    return <option key={i} value={i}>{year}</option>
                                                })}
                                                </>}   */}
                                                
                                                {/* { yearChoices.map((year, i) => {
                                                    return <option key={i} value={i}>{year}</option>
                                                })} */}


                                                    <option value="-1">Choose Your Year</option>
                                                    { yearChoices.map((year, i) => {
                                                    return <option key={i} value={i}>{year}</option>
                                                    })}



                                            </select>
                                        </div>


                                        <div className="mb-2">
                                            <label className="form-label text-white">Major</label><br />
                                            <input
                                                type="text"
                                                placeholder='major'
                                                name="major"
                                                value={user.major}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>

                                        <div className="mb-2">
                                            <label className="form-label text-white">Bio</label><br />
                                            <textarea
                                                placeholder='Bio'
                                                name="bio"
                                                value={user.bio}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>
                                        
                                        {/* <div className="h3">
                                            <span></span>
                                            <span className="mb-2" style={{}}><i id="instagram-icon" className="bi-instagram p-2"></i> Instagram</span> 
                                        </div> */}

                                        <div className="d-flex h5 align-items-center justify-content-center gap-3 mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                            </svg>
                                            <div className="div">
                                                <p className="" style={{marginBottom : "0px"}}>Instagram</p>
                                            </div>
                                        </div>


                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">@</span>
                                                </div>
                                                <input type="text" 
                                                name="instagramUsername"
                                                value= {user.instagramUsername}
                                                onChange={handleChange}
                                                className="form-control" 
                                                placeholder="Instagram username" 
                                                aria-label="Username" 
                                                aria-describedby="basic-addon1"/>
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
                                                    className="form-control mb-1 w-50"
                                                    value={interest}
                                                    onChange={e => setInterest(e.target.value)}
                                                />
                                                <ThemeProvider theme={theme}>
                                                    <IconButton color="primary" aria-label="add to interest" onClick={handleInterestSubmit}>
                                                        <PlaylistAddIcon fontSize="medium" />
                                                    </IconButton>
                                                </ThemeProvider>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2 mb-3 w-100 flex-wrap">
                                            {
                                                Object.keys(user.interests).map((interest, i) => {
                                                    return <Chip label={interest} sx = {{bgcolor : blue[100]}} onDelete={(e) => deleteInterest(e, interest)} key={i} />
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