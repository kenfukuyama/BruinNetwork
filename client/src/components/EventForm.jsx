import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const EventForm = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();

    const getToday = () => {
        let MyDate = new Date();
        let MyDateString;
        MyDateString = + MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) +  '-' + ('0' + MyDate.getDate()).slice(-2);
        return MyDateString;
    }

    const [event, setEvent] = useState({
        name : "",
        eventDate : getToday(),
        description: ""
    }); 


    const createEvent = (e) => {
        e.preventDefault();


        axios.post('http://localhost:8000/api/events/', {
            name : event.name,
            description: event.description,
            eventDate: event.eventDate
        })
            .then(res => {
                console.log(res);
                setEvent({
                        name : "",
                    eventDate : getToday(),
                    description: ""
                });
                // navigate("/events");

            })
            .catch(err => console.error(err));
    }

    const handleChange = (e) => {
        setEvent({...event, [e.target.name] : e.target.value});
    }




    return (
        <div>
            <div className="container">
                <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">
                    <h3>Add an Event</h3>
                    <form onSubmit={createEvent}>
                        <div className="mb-2">
                            <label className="form-label">Name</label><br />
                            <input
                                type="text"
                                name = "name"
                                value={event.name}
                                onChange = {handleChange}
                                className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Description</label><br />
                            <input
                                type="text"
                                name = "description"
                                value={event.description}
                                onChange = {handleChange}
                                className="form-control" />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Event Date</label><br />
                            <input
                                type="date"
                                name = "eventDate"
                                value={event.eventDate}
                                onChange = {handleChange}
                                className="form-control" />
                        </div>
                        <input type="submit" className="btn btn-primary" />
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default EventForm;