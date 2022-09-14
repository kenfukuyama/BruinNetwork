
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

    return (


        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-10 col-lg-8 col-xl-8">
                    {!events || loading ?
                            (<ScaleLoader size={100} color="white" loading={!loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            <div className="fade-in card bg-transparent" style={{ borderRadius: "15px", backgroundColor: "#ffffff", overflowY : "scroll" , height: "93vh"}}>
                                <div className="d-flex justify-content-center">
                                    <div className="input-group search-bar p-4 w-md-75 w-lg-100">
                                        <input type="text" className="form-control rounded live-search-box regular" placeholder="Search Events" aria-label="Search Events"
                                            aria-describedby="search-addon" />
                                        <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
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