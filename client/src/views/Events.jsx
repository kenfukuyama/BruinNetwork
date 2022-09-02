
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import EventList from '../components/EventList';


const Events = () => {
    const [events, setEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // * initial message
    // const [ message, setMessage ] = useState("Loading...")  

    // * for people
    useEffect(()=>{
        axios.get('http://localhost:8000/api/events')
            .then(res => {
                setEvents(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[events]);

    return (
        <div>
            
            <div className="container">
                <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">
                    <div className="d-flex justify-content-center">
                        <div className="input-group search-bar w-100 mb-3">
                            <input type="text" className="form-control rounded live-search-box regular" placeholder="Search Events" aria-label="Search Events"
                                aria-describedby="search-addon" />
                            <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
                        </div>
                    </div>
                    <div className="row my-2">
                            <Link className="styled-button btn btn-light" to={"/events/new"}>Add an Event</Link>
                        </div>

                    <div className="row">
                        <div className="col">
                            {loaded && <EventList events={events} />}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Events;