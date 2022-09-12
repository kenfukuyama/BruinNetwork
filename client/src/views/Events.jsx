
import React, { useContext, useEffect, useState } from 'react'
// import {Link} from 'react-router-dom';
import axios from 'axios';
import EventList from '../components/EventList';
// import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
// import jwt from 'jwt-decode';
import {LoggedinContext} from '../context/LoggedinContext';
import ScaleLoader from 'react-spinners/ScaleLoader';


const Events = () => {
    // const cookies = new Cookies();
    const navigate = useNavigate();
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const {loggedinInfo} = useContext(LoggedinContext);

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
                setEvents(res.data);
                setLoading(true);
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

    return (


        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-10 col-lg-8 col-xl-8">
                    {!events || !loading ?
                            (<ScaleLoader size={100} color="white" loading={!loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            <div className="card" style={{ borderRadius: "15px", backgroundColor: "#ffffff" }}>
                                <div className="d-flex justify-content-center">
                                    <div className="input-group search-bar p-4 w-md-75 w-lg-100">
                                        <input type="text" className="form-control rounded live-search-box regular" placeholder="Search Events" aria-label="Search People"
                                            aria-describedby="search-addon" />
                                        <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
                                    </div>
                                    

                                </div>
                                {loading && <EventList events={events} />}
                            </div>
                    }
                    </div>
                </div>
            </div>
        </div>
        

        // <div className="fade-in fixed-top mt-4 w-50">
        // <div className="fade-in fixed-top mt-4 w-50 container">
        // <div className="fade-in vh-100 mt-4">
        //     <div className="row d-flex justify-content-center">
        //         <div className="input-group search-bar w-100 mb-3 mt-5">
        //             <input type="text" className="form-control rounded live-search-box regular" placeholder="Search Events" aria-label="Search Events"
        //                 aria-describedby="search-addon" />
        //             <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
        //         </div>

        //         <div className="row">
        //             <div className="col-3 border border-white bg-white mt-3 rounded shadow pb-1" style={{ height: "50vh" }}>
        //                 <h5 className="m-2 text-center"><strong>Filter</strong></h5>
        //                 <form action="/events/filter" method="post">
        //                     <h6 className="m-2">By Day of the Week:</h6>
        //                     <div className="form-check form-switch m-2">
        //                         <input className="form-check-input" type="checkbox" id="monday" name="dayfilter" value="2" />
        //                         <label className="form-check-label" htmlFor="monday">Monday</label>
        //                     </div>
        //                     <div className="form-check form-switch m-2">
        //                         <input className="form-check-input" type="checkbox" id="tuesday" name="dayfilter" value="3" />
        //                         <label className="form-check-label" htmlFor="tuesday">Tuesday</label>
        //                     </div>
        //                     <div className="form-check form-switch m-2">
        //                         <input className="form-check-input" type="checkbox" id="wednesday" name="dayfilter" value="4" />
        //                         <label className="form-check-label" htmlFor="wednesday">Wednesday</label>
        //                     </div>
        //                     <div className="form-check form-switch m-2">
        //                         <input className="form-check-input" type="checkbox" id="thursday" name="dayfilter" value="5" />
        //                         <label className="form-check-label" htmlFor="thursday">Thursday</label>
        //                     </div>
        //                     <div className="form-check form-switch m-2">
        //                         <input className="form-check-input" type="checkbox" id="friday" name="dayfilter" value="6" />
        //                         <label className="form-check-label" htmlFor="Friday">Friday</label>
        //                     </div>
        //                     <div className="form-check form-switch m-2">
        //                         <input className="form-check-input" type="checkbox" id="saturday" name="dayfilter" value="7" />
        //                         <label className="form-check-label" htmlFor="saturday">Saturday</label>
        //                     </div>
        //                     <div className="form-check form-switch m-2">
        //                         <input className="form-check-input" type="checkbox" id="sunday" name="dayfilter" value="1" />
        //                         <label className="form-check-label" htmlFor="sunday">Sunday</label>
        //                     </div>
        //                     <div className="d-flex justify-content-between align-items-center m-2 mt-3">
        //                         <a href="/events/filters/clear" className="btn btn-secondary">Clear</a>
        //                         <input type="submit" value="Apply" className="btn btn-primary" />
        //                     </div>
        //                 </form>

        //             </div>
        //             <div className="col-9">
        //                 <div className="row mb-3 mt-3">
        //                     <div className="d-flex align-items-center justify-content-between">
        //                         <div className="date-event btn bg-white rounded"><a className="text-decoration-none text-black" href="/events/dashboard">All</a></div>
        //                         <div className="date-event btn bg-white rounded"><a className="text-decoration-none text-black" href="/events/dashboard/today">Today</a></div>
        //                         <div className="date-event btn bg-white rounded"><a className="text-decoration-none text-black" href="/events/dashboard/tommorrow">Tommorrow</a></div>
        //                         <div className="date-event btn bg-white rounded"><a className="text-decoration-none text-black" href="/events/dashboard/thursdays">Thirsty Thursday</a></div>
        //                         <div className="date-event btn bg-white rounded"><a className="text-decoration-none text-black" href="/events/dashboard/fridays">Thank God It's Friday</a></div>
        //                         <div className="date-event btn bg-white rounded"><a className="text-decoration-none text-black" href="/events/dashboard/weekend">This Weekend</a></div>
        //                         <div className="date-event btn bg-white rounded"><a className="text-decoration-none text-black" href="/events/dashboard/month">This Month</a></div>
        //                         {/* <div class="date-event"><a href="/events/dashboard/">Select Date</a></div> */}
        //                     </div>
        //                 </div>
        //                 {loading && <EventList events={events} />}
        //             </div>
        //         </div>
    )
}
export default Events;