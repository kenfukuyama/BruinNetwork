import axios from 'axios';
import React, {useContext, useState} from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { LoggedinContext } from '../context/LoggedinContext';


const SavedEventsList = ({events}) => {
    const [formattedEvents, SetFormattedEvents] = useState([]);
    const {loggedinInfo} = useContext(LoggedinContext);
    const user = useRef(null);

    

    useEffect(() => {
        // console.log(events)
        //we don't want do anything until finishing loading the user
        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
            .then(res => {
                // console.log(res.data);
                user.current = res.data;
                SetFormattedEvents(formatEvents(events));
                // let tempedUsername = res.data.username;
                // ! this takes care of case when user refreshes, and destroy username
                // setLoggedinInfo({ ...loggedinInfo, loggedinUsername: tempedUsername })
            })

        return () => { 
            if (user.current) {
                axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user.current)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => { console.error(err) });
            }
            
        };
    }, [events, loggedinInfo.loggedinId]);

    
    const formatEvents = (paramEvents) => {
        let tempFormattedEvents = paramEvents.map((event, i) => {
            if (event.startTime && event.endTime && event.eventDate) {
                return {...event, 
                    eventDate: new Date(event.eventDate).toLocaleDateString("en", { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }),
                    startTime: new Date(event.startTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' }),
                    endTime: new Date(event.endTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' }),
                    liked : (event._id in user.current.savedEvents)
                };
            }
            else {
                return {...event};
            }
        });
        return tempFormattedEvents;

    } 

    const toggleLiked = (e, i) => {
        console.log(i);
        let tempEvents = formattedEvents.map((eachEvent, idx) => {
            if (idx === i) {
                // not liked
                if (!eachEvent.liked) {
                    console.log("add to user event list");
                    let obj = {};
                    obj[eachEvent._id] = eachEvent.name;
                    user.current = {...user.current, savedEvents: {...user.current.savedEvents, ...obj}};
                }
                else {
                    console.log("remove it from the list");
                    delete user.current.savedEvents[eachEvent._id];
                }
                eachEvent.liked = !eachEvent.liked;
            }
            return eachEvent;
        })
        // * guard against user refreshing
        //  * updated this so it won't rely on the dismount functions
        if (user.current) {
            axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user.current)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => { console.error(err) });
        }
        SetFormattedEvents(tempEvents);
    };

    return (
        <>
                    {formattedEvents.map((event, i) =>
                    <div className="" key={i}>
                        <div className="card m-2 shadow-lg card-border-radius">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="event-name">
                                        <a href="/events/show/{{event.id}}" className="text-decoration-none h5 ">{event.name}</a>
                                    </div>
                                    <div className="event-time"> {event.eventDate} at {event.startTime}</div>
                                </div>
                                <div className="d-flex align-items-center justify-content-end">
                                    <div className="event-time">{event.place}</div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex  justify-content-between">
                                    <div className="">{event.description}  <br /></div>
                                    <div className="d-flex gap-1">
                                        <i className={`bi bi-bookmark${event.liked ? "-fill" : "" } nav-icon`} onClick={(e) => toggleLiked(e, i)}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>



    )
}

export default SavedEventsList