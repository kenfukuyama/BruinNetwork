import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScaleLoader from 'react-spinners/ScaleLoader';


const Chatrooms = () => {
    const [roomSelection, setRoomSelection] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    const enterChat = (e) => {
        e.preventDefault();
        navigate(`/chatroom/${roomSelection}`);
    };

    return (
        // <div>
        //     <div id="username-page" className="fade-in d-flex align-items-center text-white">
        //         <div className="container username-page-container text-center pt-5 vh-100 styled-text text-white">
        //             <h2 className="mt-5">Select your room, username</h2>
        //             <p className="text-success"> <span className=""></span> 1203 online</p>
        //             <div className="d-flex justify-content-center">
        //                 <div className="input-group search-bar p-4 w-md-75 w-lg-50">
        //                     <input type="text" className="form-control rounded live-search-box regular" placeholder="Search Channels" aria-label="Search Channels"
        //                         aria-describedby="search-addon" />
        //                     <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="vh-100">
                <div className="container py-5 h-100 fade-in">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-md-9 col-lg-7 col-xl-5">
                        {!user ?
                            (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                            <div className="card" style={{ borderRadius: "15px", backgroundColor: "#ffffff" }}>
                                    <div className="card-body p-4 text-black">
                                        <div className="d-flex justify-content-center">
                                            <div className="input-group search-bar p-4 w-md-75 w-lg-50">
                                                <input type="text" className="form-control rounded live-search-box regular" placeholder="Search Channels" aria-label="Search Channels"
                                                    aria-describedby="search-addon" />
                                                <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
                                            </div>
                                        </div>
                                </div>


                            </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Chatrooms;
