import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';

import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { blue } from '@mui/material/colors';

import { useRef } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

import Chip from '@mui/material/Chip';

const EventForm = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();
    const { loggedinInfo } = useContext(LoggedinContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const user = useRef(null);
    const publicContacts = useRef([]);
    // const [created, setCreated] = useState(false);

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8000/api/users/' + id)
            .then(res => {
                user.current = res.data;


                for (let i = 0; i <  res.data.contacts.length; i++) {
                    if (res.data.contacts[i][1]) {
                        (publicContacts.current).push((res.data.contacts[i][0]));
                    }
                }
                console.log( publicContacts.current)
                // setOtherUser(res.data);
                // console.log(otherUser);
                // setOtherUserLoading(false);
                setLoading(false);
            })
            .finally(() => setLoading(false));


    }, [loggedinInfo.loggedin, id, navigate])


    return (
        <div>
            {/* <div className="container"> */}
            {/* <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in"> */}
            <div className="vh-100">
                <div className="container py-5 h-100 fade-in">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-9 col-lg-7 col-xl-5">
                        {!user.current ?
                            (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                            <div className="card" style={{ borderRadius: "15px", backgroundColor: "#ffffff" }}>
                                <div className="card-body p-4 text-black">
                                    {/* <div>
                                                <h6 className="mb-4">Exquisite hand henna tattoo</h6>
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <p className="small mb-0"><i className="far fa-clock me-2"></i>3 hrs</p>
                                                    <p className="fw-bold mb-0">$90</p>
                                                </div>
                                            </div> */}
                                    <div className="d-flex align-items-center mb-4 justify-content-between">
                                        <div className="d-flex userName align-items-center">
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
                                                    <h4 className="mb-0">{user.current.nickname}</h4>
                                                </div>
                                                <div className="">
                                                    <p className="mb-0">(@{user.current.username})</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <button className='btn btn-primary'>
                                                connect
                                            </button>
                                        </div>
                                    </div>
                                    {/* <hr/> */}
                                    <div className="row my-4">
                                        <div className="col-sm-3">
                                            <p className="text-muted mb-0">Year</p>
                                        </div>
                                        <div className="col-sm-9">

                                            <p className={`mb-0 ${user.current.year ? "" : "text-muted"}`}>{user.current.year ?  user.current.year : "No information yet"}</p>
                                            

                                        </div>
                                    </div>
                                    {/* <hr/> */}
                                    <div className="row my-4">
                                        <div className="col-sm-3">
                                            <p className="text-muted mb-0">Major</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className={`mb-0 ${user.current.year ? "" : "text-muted"}`}>{user.current.major ?  user.current.major : "No information yet"}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-4 mb-2">
                                        <div className="col-sm-3">
                                            <p className="text-muted mb-0">Bio</p>
                                        </div>
                                    </div>

                                    <hr className="mt-0 mb-4" />
                                    <div className="row pt-1">
                                        <div className="mb-3">
                                            <p className={`${user.current.year ? "" : "text-muted"}`}>{user.current.bio ?  user.current.bio : "No information yet"}</p>
                                        </div>
                                    </div>

                                    <h6 className="text-muted ms-4" style={{textAlign: "left"}} >Contact</h6>
                                    <hr className="mt-0 mb-4" />
                                    <div className="pt-1 d-flex justify-content-around flex-wrap" >
                                        {/* <div className="col-6 mb-3">
                                            <h6>Email</h6>
                                            <p className="text-muted">info@example.com</p>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6>Phone</h6>
                                            <p className="text-muted">123 456 789</p>
                                        </div> */}

                                    
                                        {
                                            publicContacts.current.length > 0 ?
                                                publicContacts.current.map((contact, i) => {
                                                    return (<div className="mb-3" key={i}>
                                                                <h6 className="text-muted">Contact {i + 1}</h6>
                                                                <p>{contact}</p>
                                                            </div>)
                                                }) : <div className="mb-3">
                                                    <p className="text-muted">No information yet</p>
                                                    </div>

                                        }
                                    </div>

                                    <h6 className="text-muted ms-3" style={{textAlign: "left"}} >Interests</h6>
                                    <hr className="mt-0 mb-4" />
                                    <div className="row pt-1">

                                        <div className="d-flex gap-2 mb-3 w-100 flex-wrap justify-content-center">
                                                { Object.keys(user.current.interests).length > 0 ?
                                                    Object.keys(user.current.interests).map((interest, i) => {
                                                        return <Chip label={interest} color="success" key={i} />
                                                    }) : <p className="text-muted">No information yet</p>
                                                }
                                        </div>
                                    </div>

                                    {/* <p className="my-4 pb-1">52 comments</p>
                                                <button type="button" className="btn btn-success btn-rounded btn-block btn-lg"><i
                                                    className="far fa-clock me-2"></i>Book now</button> */}
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default EventForm;