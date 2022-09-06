import React from 'react'
import { Link } from 'react-router-dom';



const Main = () => {

    return (
        <div className="container">
            <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">
                <h3 className="display-3 styled-heading">BruinNetwork</h3>
                <p className="lead styled-text">Connect and chat with Bruins</p>

                <div className="d-flex gap-2">
                    <Link className="btn btn-light btn-lg mt-2" to={"/events"}><strong>Explore Events</strong> <i className="bi-arrow-right-short"></i></Link>
                    <Link  className="btn btn-light btn-lg mt-2" to={"/chitchat"}><strong>Chat with Random Bruins</strong> <i className="bi-arrow-right-short"></i></Link>
                </div>

                <div className="d-flex gap-2">
                    <Link className="btn btn-light btn-lg mt-2" to={"/login"}><strong>Login</strong> <i className="bi-arrow-right-short"></i></Link>
                    <Link className="btn btn-light btn-lg mt-2" to={"/register"}><strong>Register</strong> <i className="bi-arrow-right-short"></i></Link>
                </div>
            </div>   
        </div>
    );
}
export default Main;