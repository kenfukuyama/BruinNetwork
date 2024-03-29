import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


const EventForm = (props) => {
    //keep track of what is being typed via useState hook
    const navigate = useNavigate();
    const {loggedinInfo} = useContext(LoggedinContext);
    const [created, setCreated] = useState(false);
    // const [errors, setErrors] = useState([]);
    const [errorsObj, setErrorsObj] = useState({});
    const [createdId, setCreatedId] = useState(null);


    // * anchor
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popper' : undefined;
    

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
        link: "",
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
            link : event.link,
            userId : event.userId

        })
            .then(res => {
                // console.log(res);
                setCreated(true);
                setCreatedId(res.data._id);
                // setErrors([]);
                setErrorsObj({});
                // navigate("/myevents");

            })
            .catch(err => {
                // console.log(err);
                const errResponse = err.response.data.errors;
                // const errArr = [];
                const errObj = {};
                // for (const key of Object.keys(errResponse)) {
                //     let obj = {};
                //     obj[key] = errResponse[key].message;
                //     errArr.push(obj);
                //     // Another way
                //     // errArr.push({[key] : errResponse[key].message});
                // }
                // setErrors(errArr);

                for (const key in errResponse) {
                    // if (!errObj[key]) {
                    errObj[key] = [errResponse[key].message];
                    // } else {
                    //     errObj[key].push(errResponse[key].message);
                    // }
                }
                setErrorsObj(errObj);


            });
    }

    const handleChange = (e) => {
        if (e.target.name === 'startTime') {
            let date = new Date()
            date.setHours(e.target.value.substring(0, 2), e.target.value.substring(3, 5))
            let tempEndHour = "";
            if (date.getHours()+1 === 24) {
                tempEndHour = "00";
            }
            else {
                tempEndHour = String(date.getHours()+1).padStart(2, '0');
            }
            let tempEndTime =  tempEndHour + ":" + String(date.getMinutes()).padStart(2, '0')
            // console.log();
            // console.log(date.getMinutes().padStart(2, '0'));
            setEvent({...event,  startTime: e.target.value, endTime: tempEndTime });
            
            // console.log("it's start time or EndTime")
            // console.log(e.target.value.substring(0, 2) + " hour")
            // console.log(e.target.value.substring(3, 5) + " minutes")


        }
        else {
            setEvent({...event, [e.target.name] : e.target.value});
        }
    }


    const refreshComponent = () => {
        setEvent({
            name: "",
            eventDate: getToday(),
            description: "",
            startTime: "18:00",
            endTime: "19:00",
            place: "",
            link: "",
            userId : loggedinInfo.loggedinId
        });
        setCreated(false);
    };


    return (
        <div>
            <div className="vh-100">
                <div className="container py-5 h-100 fade-in">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-7 col-lg-8 col-xl-7">
                    <div className="card bg-transparent text-white scroll-box" style={{overflowY : "scroll", maxHeight: "93vh"}}>
                        <h4 className="card-header p-4">About Your Event</h4>
                        <div className="card-body">
                            <form onSubmit={createEvent}>
                                {/* {errors && errors.map((error, i) => {
                                    return <p className="text-danger" key={i}>{error}</p>
                                })} */}
                                <div className="mb-2">
                                    <label className="form-label">Event Name <span className='text-danger'>*</span></label><br />
                                    <input
                                        type="text"
                                        placeholder='Event name'
                                        name="name"
                                        value={event.name}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.name ? "border-danger" : "" }`} />
                                        
                                    { errorsObj.name ? 
                                            <span className="form-text text-danger">
                                            {errorsObj.name}
                                            </span> 
                                        : <></> }
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Description <span className='text-danger'>*</span></label><br />
                                    <textarea
                                        placeholder='Description (≥ 10 characters)'
                                        rows="5"
                                        name="description"
                                        value={event.description}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.description ? "border-danger" : "" }`} />
                                    { errorsObj.description ? <span className="form-text text-danger">{errorsObj.description}</span> : <></> }
                                </div>

                                <div className="mb-2">
                                            <label className="form-label">Flyer / Post Link
                                                <IconButton aria-describedby={popId} onClick={handleClick}>
                                                    <InfoIcon fontSize="small"  style={{color : "#888"}}/>
                                                </IconButton>
                                            </label><br />
                                    {/* // *popper for the link */}
                                    <Popper
                                        id={popId}
                                        open={open}
                                        anchorEl={anchorEl}
                                        placement="left-start"
                                        onClick={handleClick}
                                        modifiers={[
                                            {
                                                name: 'flip',
                                                enabled: true,
                                                options: {
                                                    altBoundary: true,
                                                    rootBoundary: 'viewport',
                                                    padding: 8,
                                                },
                                            },
                                            {
                                                name: 'preventOverflow',
                                                enabled: true,
                                                options: {
                                                    altAxis: true,
                                                    altBoundary: true,
                                                    tether: true,
                                                    rootBoundary: 'document',
                                                    padding: 8,
                                                },
                                            }
                                        ]}>
                                        <Box sx={{ border: 1, pt: 1, px: 1, bgcolor: 'background.paper', width: "200px", borderRadius: "15px", borderColor: "#808080" }}>
                                            <p className='text-small text-muted text-wrap text-center'>
                                                You can link your Instagram story or post. Click ⋮ on the top right of the story or post, and paste the link here. Alternatively, you can provide a link to your flyer from other media.
                                            </p>
                                        </Box>

                                    </Popper>
                                    <textarea
                                        placeholder='paste your link here'
                                        rows="2"
                                        name="link"
                                        value={event.link}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.link ? "border-danger" : "" }`} />
                                    { errorsObj.link ? <span className="form-text text-danger">{errorsObj.link}</span> : <></> }
                                </div>
                                <div className="mb-2 center">
                                    <label className="form-label">Event Date <span className='text-danger'>*</span></label><br />
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
                                    <label className="form-label">Start Time <span className='text-danger'>*</span></label><br />
                                    <input type="time"
                                        id="startTime" 
                                        name="startTime" 
                                        value={event.startTime}
                                        onChange={handleChange}
                                        required
                                        className={`form-control ${errorsObj.startTime ? "border-danger" : "" }`} />
                                        { errorsObj.startTime ? <span className="form-text text-danger">{errorsObj.startTime}</span> : <></> }
                                </div>


                                <div className="mb-2">
                                    <label className="form-label">End Time <span className='text-danger'>*</span></label><br />
                                    <input type="time"
                                        id="endTime" 
                                        name="endTime" 
                                        value={event.endTime}
                                        onChange={handleChange}
                                        required
                                        className={`form-control ${errorsObj.endTime ? "border-danger" : "" }`} />
                                        { errorsObj.endTime ? <span className="form-text text-danger">{errorsObj.endTime}</span> : <></> }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Location <span className='text-danger'>*</span></label><br />
                                    <input
                                        type="text"
                                        placeholder='Location'
                                        name="place"
                                        value={event.place}
                                        onChange={handleChange}
                                        className={`form-control ${errorsObj.place ? "border-danger" : "" }`} />
                                        { errorsObj.place ? <span className="form-text text-danger">{errorsObj.place}</span> : <></> }
                                </div>

                                {created ? (<div className="div">
                                    <div className="div">✓ Event Posted</div>
                                    <button className="btn btn-outline-info" onClick={refreshComponent}>Create Another Event</button>
                                    <div className="d-flex align-item-center justify-content-center my-2 gap-2">
                                        {/* <button className="btn text-white" onClick={() => navigate(`/events/${createdId}`)}> See Posted Event <i className="bi-arrow-right-short"></i></button> */}
                                        {/* <IconButton sx={{ color: "#fff" }} onClick={(e) => navigate('/myevents/posted/calendar')}>
                                            <EventIcon fontSize="medium" /> 
                                        </IconButton> */}
                                        <Button color="info" variant="contained" onClick={() => navigate(`/events/${createdId}`)} startIcon={<LibraryBooksIcon />}>Check Posted Event</Button>
                                        <Button color="primary" variant="contained"  onClick={(e) => navigate('/myevents/posted/calendar')} startIcon={<EventIcon />}>Calendar View</Button>
                                    </div> 
                                    
                                    
                                    </div> ): <input type="submit" className="btn btn-outline-primary" />}
                                    
                                
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

export default EventForm;