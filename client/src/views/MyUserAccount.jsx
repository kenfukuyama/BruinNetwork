

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import {Switch, FormGroup, FormControlLabel } from '@material-ui/core';

const MyUserAccount = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [updated, setUpdated] = useState(false);
    const { loggedinInfo } = useContext(LoggedinContext);
    const navigate = useNavigate();




    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
                setLoading(false);
            })

    }, [])


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


    // if (loading) {
    //     return (
    //         <div className="container vh-100">
    //             <DotLoader size={100} color="white" loading={loading} cssOverride={{display: "block", position : "fixed", bottom: "5%", right : "10%"}} />
    //         </div>
    //     )
    // }
    return (
        <div>
            <div className="container">
                <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">   
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

                                    <div className="d-flex gap-3">
                                        <div className="mb-3">
                                            <label className="form-label text-white">Contact 1</label><br />
                                            <input
                                                type="text"
                                                value={user.contacts[0][0]}
                                                onChange={(e) => (handleContact(e, 0))}
                                                className="form-control mb-1" />
                                            <div className="d-flex justify-content-center">
                                                <FormGroup>
                                                    <FormControlLabel  control={<Switch checked={user.contacts[0][1]}  size="small" onChange={e => handleContactVisiblity(e, 0)}/>}  label={user.contacts[0][1] ? "Public" : "Friends Only"} labelPlacement="bottom"/>
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
                                                    <FormControlLabel  control={<Switch checked={user.contacts[1][1]} size="small" onChange={e => handleContactVisiblity(e, 1)}/>} label={user.contacts[1][1] ? "Public" : "Friends Only"} labelPlacement="bottom"/>
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
                                                    <FormControlLabel  control={<Switch checked={user.contacts[2][1]}  size="small" onChange={e => handleContactVisiblity(e, 2)}/>}  label={user.contacts[2][1] ? "Public" : "Friends Only"} labelPlacement="bottom"/>
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>


                                    {/* // TODO fix interest */}
                                    {/* <div className="mb-2">
                                        <label className="form-label text-white">interests</label><br />
                                        <textarea
                                            placeholder='interests'
                                            name="interests"
                                            value={user.interests}
                                            onChange={handleChange}
                                            className="form-control" />
                                    </div> */}
                                    <button className="btn btn-primary w-25" onClick={updateUser}>{updated ? "✓ Updated" : "Update"}</button>
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </div>
    )


}

export default MyUserAccount