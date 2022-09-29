import React, { useContext } from 'react'
import { Link } from 'react-router-dom';


import {LoggedinContext} from '../context/LoggedinContext';
import logo from '../assets/network.png';



const Main = () => {
    const {loggedinInfo} = useContext(LoggedinContext);

    return (
        <div className="container">
            <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">
                <img src={logo}/>
                <h3 className="display-3 styled-heading">BruinNetwork</h3>
                <p className="lead styled-text" style={{fontFamily : "Courier New, monospace"}}>Meet and Connect with UCLA Bruins</p>

                <div className="d-flex gap-2">
                    <Link className="btn btn-light btn-lg mt-2 text-center" to={"/events"}><strong>Explore Events</strong> <i className="bi-arrow-right-short"></i></Link>
                    <Link  className="btn btn-light btn-lg mt-2 text-center" to={"/chitchat"}><strong>Chat with Random Bruins</strong> <i className="bi-arrow-right-short"></i></Link>
                </div>

                {/* <div className="d-flex gap-2">
                    <Link className="btn btn-light btn-lg mt-2" to={"/login"}><strong>Login</strong> <i className="bi-arrow-right-short"></i></Link>
                    <Link className="btn btn-light btn-lg mt-2" to={"/register"}><strong>Register</strong> <i className="bi-arrow-right-short"></i></Link>
                </div> */}


                {loggedinInfo.loggedin ? <></> : <Link className="btn btn-trasparent btn-lg mt-2 text-center text-white" style={{position : "fixed", bottom: "3%"}} to={"/guests/events"}><strong>Quick Guest Access</strong> <i className="bi-arrow-right-short"></i></Link> }
            </div>   
        </div>
    );
}
export default Main;