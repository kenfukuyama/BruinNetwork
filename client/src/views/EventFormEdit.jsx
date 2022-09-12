import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';
import BarLoader from "react-spinners/BarLoader";

const EventFormEdit = (props) => {
    //keep track of what is being typed via useState hook
    const {id} = useParams();
    const navigate = useNavigate();
    const {loggedinInfo} = useContext(LoggedinContext);
    const [loading, setLoading] = useState(true);
    const [updated, setUpdated] = useState(false);

    const getToday = () => {
        let MyDate = new Date();
        let MyDateString;
        MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) +  '-' + ('0' + MyDate.getDate()).slice(-2);
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


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        } 

        axios.get('http://localhost:8000/api/events/' + id)
        .then( res => {
            console.log(res.data);
            let tempEvent = res.data;

            let tempEventDate = new Date(tempEvent.eventDate);
            tempEvent.eventDate = tempEventDate.getFullYear() + '-' + ('0' + (tempEventDate.getMonth()+1)).slice(-2) +  '-' + ('0' + tempEventDate.getDate()).slice(-2);

            let tempStartDate = new Date(tempEvent.startTime);
            tempEvent.startTime = tempStartDate.toTimeString().split(' ')[0].substring(0, 5);


            let tempEndDate = new Date(tempEvent.endTime);
            tempEvent.endTime = tempEndDate.toTimeString().split(' ')[0].substring(0, 5);

            setEvent(tempEvent);
        })
        .catch( err => console.log(err))
        .finally( () => {setLoading(false)});
    // eslint-disable-next-line
    }, [])

    const updateEvent = (e) => {
        e.preventDefault();
        setLoading(true);

        let eventStartTimeDate = new Date();
        eventStartTimeDate.setHours(event.startTime.substring(0, 2), event.startTime.substring(3, 5));
        let eventEndTimeDate = new Date();
        eventEndTimeDate.setHours(event.endTime.substring(0, 2), event.endTime.substring(3, 5));

        axios.put('http://localhost:8000/api/events/' + event._id, {
            name : event.name,
            description: event.description,
            eventDate: event.eventDate,
            startTime: eventStartTimeDate,
            endTime: eventEndTimeDate,
            place: event.place
        })
            .then(res => {
                console.log(res);
                // navigate("/myevents");
                setUpdated(true);

            })
            .catch(err => console.error(err))
            .finally(() => {setLoading(false);})
    }

    const handleChange = (e) => {
        if ([e.target.name] === 'startTime' || [e.target.name] === 'endTime') {
            console.log("it's start time or EndTime");
            console.log(e.target.value.substring(0, 2) + " hour");
            console.log(e.target.value.substring(3, 5) + " minutes");

        }

        setEvent({...event, [e.target.name] : e.target.value});
    }



    return (
            <div>
                <div className="container">
                    
                    <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">
                        
                        <div className="card bg-transparent text-white">
                            {/* <div className= {loading ? "" : "d-none"}>
                                <p>Updated</p>
                            </div> */}

                            <BarLoader width={100} color="white" loading={loading} cssOverride={{display: "block", margin: "0 auto", borderColor: "red", position : "fixed", bottom: "10%", right: "47%" }} />
                            <h4 className="card-header p-4">About Your Event</h4>
                            <div className="card-body">
                                <form onSubmit={updateEvent}>
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
                                        <textarea
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
                                            required />
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
                                            required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Location</label><br />
                                        <input
                                            type="text"
                                            name="place"
                                            value={event.place}
                                            onChange={handleChange}
                                            className="form-control" />
                                    </div>



                                    <input type="submit" className="btn btn-outline-primary" value={ updated ? "✓ Updated" : "Update" }/>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
}

export default EventFormEdit;