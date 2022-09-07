import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';





const EventForm = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();
    const {loggedinInfo} = useContext(LoggedinContext);
    const [created, setCreated] = useState(false);

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        } 
    // eslint-disable-next-line
    }, [])
    

    const getToday = () => {
        let MyDate = new Date();
        let MyDateString;
        MyDateString = + MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) +  '-' + ('0' + MyDate.getDate()).slice(-2);
        return MyDateString;
    }

    const [event, setEvent] = useState({
        name : "",
        eventDate : getToday(),
        description: "",
        startTime: "18:00",
        endTime: "19:00",
        place: "",
        userId : loggedinInfo.loggedinId
    }); 


    const createEvent = (e) => {
        e.preventDefault();

        let eventStartTimeDate = new Date();
        eventStartTimeDate.setHours(event.startTime.substring(0, 2), event.startTime.substring(3, 5));
        let eventEndTimeDate = new Date();
        eventEndTimeDate.setHours(event.endTime.substring(0, 2), event.endTime.substring(3, 5));

        axios.post('http://localhost:8000/api/events/', {
            name : event.name,
            description: event.description,
            eventDate: event.eventDate,
            startTime: eventStartTimeDate,
            endTime: eventEndTimeDate,
            place: event.place,
            userId : event.userId

        })
            .then(res => {
                console.log(res);

                setCreated(true);
                // navigate("/myevents");

            })
            .catch(err => console.error(err));
    }

    const handleChange = (e) => {
        if ([e.target.name] === 'startTime' || [e.target.name] === 'endTime') {
            console.log("it's start time or EndTime")
            console.log(e.target.value.substring(0, 2) + " hour")
            console.log(e.target.value.substring(3, 5) + " minutes")


        }

        setEvent({...event, [e.target.name] : e.target.value});
    }


    const refreshComponent = () => {
        setEvent({
            name: "",
            eventDate: getToday(),
            description: "",
            startTime: "18:00",
            endTime: "19:00",
            place: "",
            userId : loggedinInfo.loggedinId
        });
        setCreated(false);
    };


    return (
        <div>
            <div className="container">
                <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">
                    <div className="card bg-transparent">
                        <h4 className="card-header p-4">About Your Event</h4>
                        <div className="card-body">
                            <form onSubmit={createEvent}>
                                <div className="mb-2">
                                    <label className="form-label">Name</label><br />
                                    <input
                                        type="text"
                                        placeholder='Event name'
                                        name="name"
                                        value={event.name}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Description</label><br />
                                    <input
                                        type="text"
                                        name="description"
                                        value={event.description}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Event Date</label><br />
                                    <input
                                        type="date"
                                        name="eventDate"
                                        value={event.eventDate}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Start Time</label><br />
                                    <input type="time"
                                        className="form-control" 
                                        id="startTime" 
                                        name="startTime" 
                                        value={event.startTime}
                                        onChange={handleChange}
                                        required/>
                                    {/* <input
                                        type="date"
                                        name="eventDate"
                                        value={event.eventDate}
                                        onChange={handleChange}
                                        className="form-control" /> */}
                                </div>


                                <div className="mb-2">
                                    <label className="form-label">End Time</label><br />
                                    <input type="time"
                                        className="form-control" 
                                        id="endTime" 
                                        name="endTime" 
                                        value={event.endTime}
                                        onChange={handleChange}
                                        required/>
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Location</label><br />
                                    <input
                                        type="text"
                                        name="place"
                                        value={event.place}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>


                                {created ? (<div className="div"><p>Event Posted ✓</p> <button className="btn btn-primary" onClick={refreshComponent}>Create Another Event</button></div> ): <input type="submit" className="btn btn-primary" />}
                                
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default EventForm;