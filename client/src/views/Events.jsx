
import React, { useContext, useEffect, useState } from 'react'
// import {Link} from 'react-router-dom';
import axios from 'axios';
import EventList from '../components/EventList';
// import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
// import jwt from 'jwt-decode';
import {LoggedinContext} from '../context/LoggedinContext';
import ScaleLoader from 'react-spinners/ScaleLoader';
import EventsFilter from '../components/EventsFilter';
import { useRef } from 'react';

const Events = () => {
    // const cookies = new Cookies();
    const navigate = useNavigate();
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const {loggedinInfo} = useContext(LoggedinContext);
    const eventsRef = useRef(null);
    const [filter, setFilter] = useState("");

    const [query, setQuery] = useState("");
    // * initial message
    // const [ message, setMessage ] = useState("Loading...")  

    // * for people
    useEffect(()=>{
        // const token = cookies.get('usertoken');
        // if (!token) {
        //     navigate('/login');
        //     return;
        // }
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        } 

        axios.get('http://localhost:8000/api/events/current')
            .then(res => {
                eventsRef.current = res.data;
                setEvents(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));

        // // * this will indreclty take care of users typoonig token manually
        // const userId = jwt(token).id;
        // axios.get('http://localhost:8000/api/users/' + userId, { withCredentials: true })
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    // eslint-disable-next-line
    },[]);



    useEffect(() => {
        if (filter === "SortByTitle") {
            let tempArr = JSON.parse(JSON.stringify(eventsRef.current));
            tempArr.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            // console.log(eventsRef.current);
            setEvents(tempArr);
        }


        if (filter === "SortByDateAscending") {
            let tempArr = JSON.parse(JSON.stringify(eventsRef.current));
            tempArr.sort((a,b) => (a.eventDate > b.eventDate) ? 1 : ((b.eventDate > a.eventDate) ? -1 : 0));
            // console.log(eventsRef.current);
            setEvents(tempArr);
        }

        if (filter === "Reset") {
            setEvents(eventsRef.current);
        }


    }, [filter]);


    const search = (e) => {
        setQuery(e.target.value);
        let query = e.target.value.toString().toLowerCase();
        setEvents(eventsRef.current.filter(event => {
            let target = event.name?.toString()?.toLowerCase();
            let target1 = event.description?.toString()?.toLowerCase();
            
            let temp2 = new Date(event.eventDate).toLocaleDateString("en", { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
            let target2 = temp2.toString()?.toLowerCase();

            let temp3 = new Date(event.startTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' })
            let target3 = temp3?.toString()?.toLowerCase();

            let temp4  =  new Date(event.endTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' })
            let target4 = temp4?.toString()?.toLowerCase();
            
            return (target.includes(query) || target1.includes(query) || target2.includes(query) || target3.includes(query) || target4.includes(query));
        }));
    }

    return (


        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-10 col-lg-8 col-xl-8">
                    {!events || loading ?
                            (<ScaleLoader size={100} color="white" loading={!loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            <div className="fade-in card bg-transparent scroll-box" style={{ borderRadius: "15px", backgroundColor: "#ffffff", overflowY : "scroll" , height: "93vh"}}>
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
                                <EventsFilter setFilter={setFilter}/>
                                {events && <EventList events={events} />}
                            </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Events;