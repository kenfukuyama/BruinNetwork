
import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoggedinContext } from '../context/LoggedinContext';
import EventListEdit from '../components/EventListEdit';
import ScaleLoader from 'react-spinners/ScaleLoader';
import EventsNavigation from '../components/EventsNavigation';

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Button from '@mui/material/Button';


const MyPostedEvents = () => {
    const {loggedinInfo} = useContext(LoggedinContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        } 

        /// get all the events crated by the user.
        axios.get('http://localhost:8000/api/events/user/' + loggedinInfo.loggedinId)
            // axios.get("api/events/user/6317f12d985af7817efe4bc9")
            .then(res => {
                setEvents(res.data);
            })
            .catch(err => {})
        

      
    }, [loggedinInfo.loggedin, loggedinInfo.loggedinId, navigate])

    
    return (


        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-10 col-lg-8 col-xl-8">
                        {!events ?
                            (<ScaleLoader size={100} color="white" loading={!events} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            <div className="card fade-in bg-transparent scroll-box" style={{ borderRadius: "15px", backgroundColor: "#ffffff", overflowY : "scroll" , height: "93vh"}}>
                                <EventsNavigation/>
                                <div className="d-flex align-item-center justify-content-center my-2">
                                        <Button color="primary" variant="contained" id="navButton" startIcon={<LibraryBooksIcon />}>POSTED EVENTS</Button>
                                </div>
                                {events && <EventListEdit events={events} />}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPostedEvents;