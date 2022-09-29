
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
import EventIcon from '@mui/icons-material/Event';
import IconButton from '@mui/material/IconButton';


const MyPostedEventsList = () => {
    const {loggedinInfo} = useContext(LoggedinContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    
    const [query, setQuery] = useState("");
    const [displayEvents, setDisplayEvents] = useState([]);



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
                setDisplayEvents(res.data);
            })
            .catch(err => {})
        
    }, [loggedinInfo.loggedin, loggedinInfo.loggedinId, navigate])

    
    const search = (e) => {
        setQuery(e.target.value);
        let query = e.target.value.toString().toLowerCase();
        setDisplayEvents(events.filter(event => {
            let target = event.name?.toString()?.toLowerCase();
            let target1 = event.description?.toString()?.toLowerCase();
            let target5 = event.place?.toString()?.toLowerCase();
            
            
            let temp2 = new Date(event.eventDate).toLocaleDateString("en", { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
            let target2 = temp2.toString()?.toLowerCase();

            let temp3 = new Date(event.startTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' })
            let target3 = temp3?.toString()?.toLowerCase();

            let temp4  =  new Date(event.endTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' })
            let target4 = temp4?.toString()?.toLowerCase();

            // let target5 = event.location?.toString()?.toLowerCase();
            
            return (target.includes(query) || target1.includes(query) || target2.includes(query) || target3.includes(query) || target4.includes(query) || target5.includes(query) );
        }));
    }


    const deleteIdFromEvents = (id) => {
        let tempEvents = events.filter(event => {
            return event._id !== id
        });

        setEvents(tempEvents);
    };

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

                                <div className="d-flex align-item-center justify-content-center my-2 gap-2">
                                    <Button color="primary" variant="contained" id="navButton" startIcon={<LibraryBooksIcon />}>POSTED EVENTS - LIST </Button>
                                    <IconButton sx={{ color: "#fff"}} onClick={(e) => navigate('/myevents/posted/calendar')}>
                                        <EventIcon fontSize="medium" />
                                    </IconButton>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <div className="input-group search-bar p-4 w-md-75 w-lg-100">
                                        <input type="text"
                                            className="form-control rounded live-search-box "
                                            placeholder="Search events by name, location, date and time"
                                            aria-label="Search People"
                                            aria-describedby="search-addon"
                                            onChange={e => { search(e) }}
                                            value={query}
                                        />
                                    </div>
                                </div>

                                {events && <EventListEdit deleteIdFromEvents={deleteIdFromEvents} events={displayEvents} />}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPostedEventsList;