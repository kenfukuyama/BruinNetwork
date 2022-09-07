

import React, { useEffect } from 'react'
import { useState } from 'react';
const EventsNavMenu = (props) => {
    const navLink = ['postedEvents', 'savedEvents'];

    const [chosenLink, setChosenLink] = useState(navLink[0]);

    useEffect(() => {
        props.setChosenLink(chosenLink);
    }, [chosenLink, props])
    

    const handleChange = (e, param) => {
        // console.log(e);
        // console.log(param);
        setChosenLink(param);

    };


    return (
        <div className="col-2">
                <div className="row navigation">
                    <div className="card  m-2">
                        <div className="card-header">
                            Event
                        </div>
                        <div className="card-body p-0">
                            {/* <a href="/users/dashboard/events/likes" className="btn">Liked Events</a> <br/> */}
                            <button className="btn text-primary" value="postedEvents" onClick={(e) => {handleChange(e, e.target.value)}}>Posted Events</button>
                            <button className="btn text-primary" value="savedEvents" onClick={(e) => {handleChange(e, e.target.value)}}>Saved Events</button>
                        </div>
                    </div>
                </div>

                <div className="row navigation">
                    <div className="card  m-2">
                        <div className="card-header">
                            Connect
                        </div>
                        <div className="card-body">
                            <a href="/users/dashboard/groups" className="btn">Groups</a> <br/>
                            <a href="/users/dashboard/friends" className="btn">Friends</a>
                        </div>
                    </div>
                </div>
                <div className="row navigation">
                    <div className="card  m-2">
                        <div className="card-header">
                            Settings
                        </div>
                        <div className="card-body">
                            <a href="/users/dashboard/account" className="btn">Account</a> <br/>
                            <a href="/users/dashboard/site-settings" className="btn">Site Settings</a>
                        </div>
                    </div>
                </div>
                <div className="row navigation">
                    <div className="card  m-2">
                        <div className="card-header">
                            Help Center
                        </div>
                        <div className="card-body">
                            <a href="/users/dashboard/support" className="btn">Contact Support </a>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default EventsNavMenu;