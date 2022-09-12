
import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsNavMenu from '../components/EventsNavMenu';
import { LoggedinContext } from '../context/LoggedinContext';
import EventListEdit from '../components/EventListEdit';

import SavedEventsList from '../components/SavedEventsList';

const MyEvents = () => {
    const {loggedinInfo} = useContext(LoggedinContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const navLink = {
        postedEvents : 'Events Posted By You', 
        savedEvents : 'Your Saved Events'
    };
        
    const [chosenLink, setChosenLink] = useState(navLink[0]);

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        } 

        if (chosenLink === 'postedEvents' ) {
            /// get all the events crated by the user.
            axios.get('http://localhost:8000/api/events/user/' + loggedinInfo.loggedinId)
            // axios.get("api/events/user/6317f12d985af7817efe4bc9")
            .then( res => {
                setEvents(res.data);
            })
            .catch( err => console.log(err))
        }

        
        if (chosenLink === 'savedEvents' ) {
            /// get all the events crated by the user.
            axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId + "/saved-events")
            // axios.get("api/events/user/6317f12d985af7817efe4bc9")
            .then( res => {
                setEvents(res.data);
            })
            .catch( err => console.log(err))
        }
    }, [chosenLink, loggedinInfo.loggedin, loggedinInfo.loggedinId, navigate])

    
    return (

        <div className="container pt-4 fade-in vh-100">
            <div className="row w-100 mt-5">
                {/* // ! main content */}
                <div className="col-10">
                    <h3 className="text-white">{navLink[chosenLink]}</h3> <hr />

                    {chosenLink === "postedEvents" ? <EventListEdit events={events} /> : <SavedEventsList events={events} />}

                </div>
                <EventsNavMenu setChosenLink={setChosenLink} />
            </div>
        </div>

    )
}

export default MyEvents;