import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {blue} from '@mui/material/colors';


const EventForm = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();
    const { loggedinInfo } = useContext(LoggedinContext);
    const [created, setCreated] = useState(false);

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }
        // eslint-disable-next-line
    }, [])


    return (
        <div>
            {/* <div className="container"> */}
                {/* <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in"> */}
                <div className="vh-100">
                        <div className="container py-5 h-100 fade-in">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col col-md-9 col-lg-7 col-xl-5">
                                    <div className="card" style={{borderRadius: "15px", backgroundColor: "#ffffff"}}>
                                        <div className="card-body p-4 text-black">
                                            {/* <div>
                                                <h6 className="mb-4">Exquisite hand henna tattoo</h6>
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <p className="small mb-0"><i className="far fa-clock me-2"></i>3 hrs</p>
                                                    <p className="fw-bold mb-0">$90</p>
                                                </div>
                                            </div> */}
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
                                                            <h4 className="mb-0">sheisme</h4>
                                                        </div>
                                                        <div className="">
                                                            <p className="mb-0">(@sheisme)</p>
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
                                                        <p className="mb-0">Year</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">Johnatan Smith</p>
                                                    </div>
                                                </div>
                                                {/* <hr/> */}
                                                <div className="row my-4">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Major</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">Johnatan Smith</p>
                                                    </div>
                                                </div>
                                                <h6>Bio</h6>
                                                <hr class="mt-0 mb-4"/>
                                                <div class="row pt-1">
                                                    <div class="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        <p class="text-muted">info@example.com</p>
                                                    </div>
                                                    <div class="col-6 mb-3">
                                                        <h6>Phone</h6>
                                                        <p class="text-muted">123 456 789</p>
                                                    </div>
                                                </div>

                                                <h6>Contact</h6>
                                                <hr class="mt-0 mb-4"/>
                                                <div class="row pt-1">
                                                    <div class="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        <p class="text-muted">info@example.com</p>
                                                    </div>
                                                    <div class="col-6 mb-3">
                                                        <h6>Phone</h6>
                                                        <p class="text-muted">123 456 789</p>
                                                    </div>
                                                </div>

                                                <h6>Interests</h6>
                                                <hr class="mt-0 mb-4"/>
                                                <div class="row pt-1">
                                                    <div class="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        <p class="text-muted">info@example.com</p>
                                                    </div>
                                                    <div class="col-6 mb-3">
                                                        <h6>Phone</h6>
                                                        <p class="text-muted">123 456 789</p>
                                                    </div>
                                                </div>

                                                {/* <p className="my-4 pb-1">52 comments</p>
                                                <button type="button" className="btn btn-success btn-rounded btn-block btn-lg"><i
                                                    className="far fa-clock me-2"></i>Book now</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            {/* </div> */}

        </div>
    )
}

export default EventForm;