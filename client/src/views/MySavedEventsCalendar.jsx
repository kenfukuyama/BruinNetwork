
import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedinContext } from '../context/LoggedinContext';

import SavedEventsList from '../components/SavedEventsList';
import ScaleLoader from 'react-spinners/ScaleLoader';
import EventsNavigation from '../components/EventsNavigation';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Button from '@mui/material/Button';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import IconButton from '@mui/material/IconButton';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { useRef } from 'react';
// import CalendarTile from '../components/CalendarTile'


const MySavedEventsCalendar = () => {
    const { loggedinInfo } = useContext(LoggedinContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [displayEvents, setDisplayEvents] = useState([]);
    const [savedEventObj, setSavedEventObj] = useState({});
    const [value, onChange] = useState(new Date());


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }

        /// get all the events crated by the user.
        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId + "/saved-events")
            // axios.get("api/events/user/6317f12d985af7817efe4bc9")
            .then(res => {
                setEvents(res.data);
                setDisplayEvents(res.data);

                let tempObj = {};
                for (const event of res.data) {
                    let tempDate = new Date(new Date(event.eventDate).toLocaleDateString("en", { weekday: 'long', month: 'long', day: 'numeric', year: "numeric", timeZone: 'UTC' }));
                    if (tempDate in tempObj) {
                        tempObj[tempDate]++;
                    }
                    else {
                        tempObj[tempDate] = 1;
                    }
                }
                // console.log(tempObj);
                setSavedEventObj(tempObj);
            })
            .catch(err => { })
    }, [loggedinInfo.loggedin, loggedinInfo.loggedinId, navigate])




    useEffect(() => {
        // console.log("value +== " + value);
        let tempEvents = [];
        for (const event of events) {
            // console.log(event.eventDate);
            let tempDate = new Date(new Date(event.eventDate).toLocaleDateString("en", { weekday: 'long', month: 'long', day: 'numeric', year: "numeric", timeZone: 'UTC' }));
            // let tempDate = new Date(event.eventDate);
            // console.log(tempDate);
            // console.log(tempDate.getFullYear());
            if (tempDate.getDate() === value.getDate() &&   tempDate.getMonth() === value.getMonth() && tempDate.getFullYear() === value.getFullYear()) {
                
                // console.log("there is an event on this day!");
                // console.log(event.eventDate);
                tempEvents.push(event);
            }
        }
        setDisplayEvents(tempEvents);
        // console.log(typeof(value));
    }, [value, events]);

    // const calendarChange = (e) => {
    //     console.log(e.target.value);
    //     // console.log(value);
    //     // onChange();
    // }
    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-10 col-lg-8 col-xl-8">
                        {!events ?
                            (<ScaleLoader size={100} color="white" loading={!events} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            <div className="fade-in card bg-transparent scroll-box" style={{ borderRadius: "15px", backgroundColor: "#ffffff", overflowY: "scroll", height: "93vh" }}>

                                <EventsNavigation />
                                <div className="d-flex align-item-center justify-content-center my-2 gap-2">
                                    <Button color="primary" variant="contained" id="navButton" startIcon={<BookmarkIcon />}>SAVED EVENTS - CALENDAR </Button>
                                    <IconButton sx={{ color: "#fff" }} onClick={(e) => navigate('/myevents/saved/list')}>
                                        <FormatListBulletedIcon fontSize="medium" />
                                    </IconButton>
                                </div>
                                <div className="d-flex justify-content-center align-items-center my-2">
                                    <Calendar className={['rounded']}
                                        onChange={onChange}
                                        // onClickDay={() => { console.log("you clicked day") }}
                                        value={value}
                                        style={{ borderRadius: "15px" }}
                                        prev2Label = {null}
                                        next2Label = {null}
                                        calendarType = "US"
                                        tileContent={
                                            ({ activeStartDate, date, view }) => view === 'month' && (new Date(date.setHours(0, 0, 0, 0)) in savedEventObj) ? 
                                            <>
                                                <br />
                                                <p className='mb-0'>
                                                    <svg height="10" width="10">
                                                        <circle cx="5" cy="5" r="2.5" fill="green" />
                                                    </svg>
                                                    <span className="text-muted" style={{ fontSize: "12px" }}>{savedEventObj[new Date(date.setHours(0, 0, 0, 0))]}</span>
                                                </p>

                                            </>
                                            : 
                                            <>
                                                <br />
                                                <p className='mb-0'>
                                                    <svg height="10" width="10">
                                                        <circle cx="5" cy="5" r="2.5" fill="#ffffff00" />
                                                    </svg>
                                                    <span className="text-muted" style={{ fontSize: "12px" }}></span>
                                                </p>

                                            </>
                                        } />
                                </div>

                                <h3 className='mb-0 mt-2 text-white'>{new Date(value).toLocaleDateString("en", { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' })}</h3>
                                <div className="text-white">
                                    <hr className='' />
                                </div>

                                {events && <SavedEventsList events={displayEvents} />}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MySavedEventsCalendar;

