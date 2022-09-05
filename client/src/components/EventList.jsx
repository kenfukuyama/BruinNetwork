import React, {useState} from 'react'
import { useEffect } from 'react';

const EventList = ({events}) => {

    // const [events, setEvents] = useState(props.events);
    // let formattedEvents = [];
    const [formattedEvents, SetFormattedEvents] = useState([]);
    

    useEffect(() => {
        // for (let i = 0; i < events.length; i++) {
        //     // console.log([...formattedEvents]);
        //     setEvents([...events, ]);
        //     // console.log([...events]);
            
        // }

        let tempFormattedEvents = events.map((event, i) => {
                if (event.startTime && event.endTime && event.eventDate) {
                    return {...event, 
                        eventDate: new Date(event.eventDate).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' }),
                        startTime: new Date(event.startTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' }),
                        endTime: new Date(event.endTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'America/Los_Angeles' })
                
                    };
                }
                else {
                    return {...event};
                }
            });

        SetFormattedEvents(tempFormattedEvents);
        // ? this will run twice, once the events is initialized and second time when it's fetched?? Why???? Three more times when submitted???
        console.log("running eventList useEffect")
    }, [events]);



    

    return (
        <div className="wh-100">
            <table className="table">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {formattedEvents.map((event, i) =>
                        <tr key={i}>
                            <td>{event.name} </td>
                            <td>{event.eventDate}</td>
                            <td>{event.description}</td>
                            <td>{event.startTime}</td>
                            <td>{event.endTime}</td>
                            <td>{event.place}</td>
                            
                            <td>  
                                <div className="d-flex justify-content-center gap-3">
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
    
export default EventList;



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