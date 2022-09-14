import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';
import BarLoader from "react-spinners/BarLoader";

const EventFormEdit = (props) => {
    //keep track of what is being typed via useState hook
    const { id } = useParams();
    const navigate = useNavigate();
    const { loggedinInfo } = useContext(LoggedinContext);
    const [loading, setLoading] = useState(true);
    const [updated, setUpdated] = useState(false);
    const [errorsObj, setErrorsObj] = useState({});

    const getToday = () => {
        let MyDate = new Date();
        let MyDateString;
        MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
        return MyDateString;
    }

    const [event, setEvent] = useState({
        name: "",
        eventDate: getToday(),
        description: "",
        startTime: "18:00",
        endTime: "19:00",
        place: "",
        userId: loggedinInfo.loggedinId
    });


    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8000/api/events/' + id)
            .then(res => {
                console.log(res.data);
                let tempEvent = res.data;
                // console.log(tempEvent.eventDate);


                let tempEventDate = new Date(new Date(tempEvent.eventDate).toLocaleString("en-US", {timeZone: "UTC"}));
                tempEvent.eventDate = tempEventDate.getFullYear() + '-' + ('0' + (tempEventDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tempEventDate.getDate()).slice(-2);

                let tempStartDate = new Date(tempEvent.startTime);
                tempEvent.startTime = tempStartDate.toTimeString().split(' ')[0].substring(0, 5);


                let tempEndDate = new Date(tempEvent.endTime);
                tempEvent.endTime = tempEndDate.toTimeString().split(' ')[0].substring(0, 5);

                setEvent(tempEvent);
            })
            .catch(err => { })
            .finally(() => { setLoading(false) });
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
            name: event.name,
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
            .catch(err => {
                const errResponse = err.response.data.errors;
                const errObj = {};

                for (const key in errResponse) {
                    // if (!errObj[key]) {
                    errObj[key] = [errResponse[key].message];
                    // } else {
                    //     errObj[key].push(errResponse[key].message);
                    // }
                }
                setErrorsObj(errObj);
            })
            .finally(() => { setLoading(false); })
    }

    const handleChange = (e) => {
        if ([e.target.name] === 'startTime' || [e.target.name] === 'endTime') {
            console.log("it's start time or EndTime");
            console.log(e.target.value.substring(0, 2) + " hour");
            console.log(e.target.value.substring(3, 5) + " minutes");

        }

        setEvent({ ...event, [e.target.name]: e.target.value });
    }



    return (
        <div>
            <div className="vh-100">
                <div className="container py-5 h-100 fade-in">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-7 col-lg-8 col-xl-7">

                            <div className="card bg-transparent text-white">
                                {/* <div className= {loading ? "" : "d-none"}>
                                <p>Updated</p>
                            </div> */}

                                <BarLoader width={100} color="white" loading={loading} cssOverride={{ display: "block", margin: "0 auto", borderColor: "red", position: "fixed", bottom: "10%", right: "47%" }} />
                                <h4 className="card-header p-4">Edit Your Event</h4>
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
                                                className={`form-control ${errorsObj.name ? "border-danger" : ""}`} />

                                            {errorsObj.name ?
                                                <span className="form-text text-danger">
                                                    {errorsObj.name}
                                                </span>
                                                : <></>}
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Description</label><br />
                                            <textarea
                                                name="description"
                                                value={event.description}
                                                onChange={handleChange}
                                                className={`form-control ${errorsObj.description ? "border-danger" : ""}`} />
                                            {errorsObj.description ? <span className="form-text text-danger">{errorsObj.description}</span> : <></>}
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Event Date</label><br />
                                            <input
                                                type="date"
                                                name="eventDate"
                                                value={event.eventDate}
                                                onChange={handleChange}
                                                required
                                                className={`form-control ${errorsObj.eventDate ? "border-danger" : "" }`} />
                                            { errorsObj.eventDate ? <span className="form-text text-danger">{errorsObj.eventDate}</span> : <></> }

                                        </div>

                                        <div className="mb-2">
                                            <label className="form-label">Start Time</label><br />
                                            <input type="time"
                                                id="startTime"
                                                name="startTime"
                                                value={event.startTime}
                                                onChange={handleChange}
                                                required
                                                className={`form-control ${errorsObj.startTime ? "border-danger" : ""}`} />
                                            {errorsObj.startTime ? <span className="form-text text-danger">{errorsObj.startTime}</span> : <></>}
                                        </div>


                                        <div className="mb-2">
                                            <label className="form-label">End Time</label><br />
                                            <input type="time"
                                                id="endTime"
                                                name="endTime"
                                                value={event.endTime}
                                                onChange={handleChange}
                                                required
                                                className={`form-control ${errorsObj.endTime ? "border-danger" : ""}`} />
                                            {errorsObj.endTime ? <span className="form-text text-danger">{errorsObj.endTime}</span> : <></>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Location</label><br />
                                            <input
                                                type="text"
                                                placeholder='Location'
                                                name="place"
                                                value={event.place}
                                                onChange={handleChange}
                                                className={`form-control ${errorsObj.place ? "border-danger" : ""}`} />
                                            {errorsObj.place ? <span className="form-text text-danger">{errorsObj.place}</span> : <></>}
                                        </div>



                                        <input type="submit" className="btn btn-outline-primary" value={updated ? "✓ Updated" : "Update"} />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventFormEdit;