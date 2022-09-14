import axios from 'axios';
import React, {useContext, useState} from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';

import { LoggedinContext } from '../context/LoggedinContext';
const EventList = ({events}) => {

    // const [events, setEvents] = useState(props.events);
    // let formattedEvents = [];
    const [formattedEvents, SetFormattedEvents] = useState([]);
    const {loggedinInfo} = useContext(LoggedinContext);
    // const [user, setUser] = useState();
    const user = useRef(null);

    

    useEffect(() => {
        // for (let i = 0; i < events.length; i++) {
        //     // console.log([...formattedEvents]);
        //     setEvents([...events, ]);
        //     // console.log([...events]);
            
        // }

        // let tempFormattedEvents = events.map((event, i) => {
        //         if (event.startTime && event.endTime && event.eventDate) {
        //             return {...event, 
        //                 eventDate: new Date(event.eventDate).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' }),
        //                 startTime: new Date(event.startTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' }),
        //                 endTime: new Date(event.endTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' }),
        //                 liked : false
        //             };
        //         }
        //         else {
        //             return {...event};


        //         }
        // });


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

        
        // ? this will run twice, once the events is initialized and second time when it's fetched?? Why???? Three more times when submitted???
        // console.log("running eventList useEffect")

        return () => {
            // console.log("clean up firing");
            // console.log(user.current);
            // // console.log(formattedEvents);
            // // console.log(formattedEvents.filter(eachEvent => eachEvent.liked));

            // axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user.current)
            // .then(res => {
            //     // console.log(res.data);
            //     user.current = res.data;
            //     // let tempedUsername = res.data.username;
            //     // ! this takes care of case when user refreshes, and destroy username
            //     // setLoggedinInfo({ ...loggedinInfo, loggedinUsername: tempedUsername })
            // })

            // console.log("This is formattdEvents");
            // console.log(formattedEvents);
            // let res = {};
            // for (let i = 0; i < formattedEvents.length; i++) {
            //     console.log(formattedEvents[i]);
            //     if (formattedEvents[i].liked) {
            //         console.log("liked");
            //         let obj = {};
            //         obj[formattedEvents[i]._id] = formattedEvents[i].name;
            //         res = {...res, ...obj};
            //     }
            // }
            // console.log(res);

        };
    }, [events, loggedinInfo.loggedinId]);


    const formatEvents = (paramEvents) => {
        let tempFormattedEvents = paramEvents.map((event, i) => {
            if (event.startTime && event.endTime && event.eventDate) {
                // if (event._id === "###") {
                    // console.log(event.eventDate);
                    // console.log( new Date(event.eventDate).toLocaleDateString("en", { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'}));
                // }
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
        // console.log(i);
        let tempEvents = formattedEvents.map((eachEvent, idx) => {
            if (idx === i) {
                // not liked
                if (!eachEvent.liked) {
                    // console.log("add to user event list");
                    let obj = {};

                    obj[eachEvent._id] = eachEvent.name;
                    user.current = {...user.current, savedEvents: {...user.current.savedEvents, ...obj}};

                }
                else {
                    // console.log("remove it from the list");
                    // delete user.savedEvents[eachEvent._id];
                    // const {}

                    // * thise perfomrs deep copy instead of shallow one.
                    // let tempUser = JSON.parse(JSON.stringify(user));
                    // console.log(tempUser);
                    // console.log(user);
                    delete user.current.savedEvents[eachEvent._id];
                    // console.log(tempUser);
                    // setUser(tempUser);
                }
                eachEvent.liked = !eachEvent.liked;
            }
            return eachEvent;
        })
        // * guard against user refreshing
        if (user.current) {
            axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user.current)
                .then(res => {
                    // console.log(res.data);
                })
                .catch(err => {});
        }
        SetFormattedEvents(tempEvents);

        // tempEvents.liked = !tempEvents.liked;
        // console.log(tempEvents);

    };


    return (
        // <div className="overflow-auto events-show">
        <>
            {formattedEvents.map((event, i) =>
                <div className="live-search-list" key={i}>
                    <div className="card m-2 shadow-lg card-border-radius">
                        <div className="card-header">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="event-name live-search-list">
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
                                <div className="div">
                                    <i className={`bi bi-bookmark${event.liked ? "-fill" : ""} nav-icon`} onClick={(e) => toggleLiked(e, i)}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>



        
    )
}
    
export default EventList;




// <table className="table">
// <thead>
//     <tr>
//         <th>Event Name</th>
//         <th>Date</th>
//         <th>Description</th>
//         <th>Start Time</th>
//         <th>End Time</th>
//         <th>Location</th>
//     </tr>
// </thead>
// <tbody>
//     {formattedEvents.map((event, i) =>
//         <tr key={i}>
//             <td>{event.name} </td>
//             <td>{event.eventDate}</td>
//             <td>{event.description}</td>
//             <td>{event.startTime}</td>
//             <td>{event.endTime}</td>
//             <td>{event.place}</td>
            
//             <td>  
//                 <div className="d-flex justify-content-center gap-3">
//                 </div>
//             </td>
//         </tr>
//     )}
// </tbody>
// </table>





// extra code
    // const formatData = () => {
    //     for (let i=0; i<events.length; i++) {
    //         if (events[i].startTime != null) {
    //             // console.log((typeof(events[i].startTime)));
    //             let tempStartTime = new Date(events[i].startTime).toLocaleTimeString('en',
    //             { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' });
    //             console.log(tempStartTime);
    //             // events[i] = {...events[i], startTime: tempStartTime};
    //             // eventsState.push({...events[i], startTime: tempStartTime});
    //             // console.log(formattedEvents);
    //             // SetFormattedEvents(["abc"]);
    //             // console.log(formattedEvents);

    //             // console.log(new Date(events[i].startTime).toLocaleTimeString('en',
    //             // { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' }));
    //         }
    //         // console.log(events[i]); 
    //     }
    // setLoaded(true);
    // // ? this will run twice, once the events is initialized and second time when it's fetched?? Now it runs three times??
    // console.log("hello");
    

    // }


    // for (let i = 0; i < events.length; i++) {
    //     if (events[i].startTime != null) {
    //         // console.log((typeof(events[i].startTime)));
    //         let tempStartTime = new Date(events[i].startTime).toLocaleTimeString('en',
    //             { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' });
    //         console.log(tempStartTime);
    //         // events[i] = {...events[i], startTime: tempStartTime};
    //         // eventsState.push({...events[i], startTime: tempStartTime});
    //         // console.log(formattedEvents);
    //         SetFormattedEvents(["abc"]);
    //         // console.log(formattedEvents);

    //         // console.log(new Date(events[i].startTime).toLocaleTimeString('en',
    //         // { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' }));
    //     }
    //     // console.log(events[i]); 
    // }
    // setLoaded(true);
    // // ? this will run twice, once the events is initialized and second time when it's fetched?? Now it runs three times??
    // console.log("hello");
    // console.log(formattedEvents);


    // const [formattedEvents, SetFormattedEvents] = useState([]);
    // const [loaded, setLoaded] = useState(false);