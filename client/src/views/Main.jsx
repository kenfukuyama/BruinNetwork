import React from 'react'


const Main = () => {

    return (
        <div className="container">
            <div className="d-flex vh-100 align-items-center justify-content-center flex-column fade-in">
                <h3 className="display-3 styled-heading">BruinNetwork</h3>
                <p className="lead styled-text">Connect and chat with Bruins</p>

                <div className="d-flex gap-2">
                    <a className="btn btn-light btn-lg mt-2" href="/events"><strong>Explore Events</strong> <i clasName="bi-arrow-right-short"></i></a>
                    <a className="btn btn-light btn-lg mt-2" href="/chitchat"><strong>Chat with Random Bruins</strong> <i className="bi-arrow-right-short"></i></a>
                </div>
            </div>   
        </div>
    );
}
export default Main;