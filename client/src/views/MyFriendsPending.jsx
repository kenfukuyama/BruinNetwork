import React from 'react'
import { useState } from 'react';

import ScaleLoader from 'react-spinners/ScaleLoader';

import FriendsNavigation from '../components/FriendsNavigation';

const MyFriendsPending = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(true);

    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-9 col-lg-7 col-xl-5">
                        {!user ?
                            (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                                <div className="card" style={{ borderRadius: "15px", backgroundColor: "#ffffff" }}>
                                    <div className="card-body p-4 text-black">
                                        <div className="d-flex justify-content-center">
                                            <div className="input-group search-bar p-4 w-md-75 w-lg-100">
                                                <input type="text" className="form-control rounded live-search-box regular" placeholder="Search People" aria-label="Search People"
                                                    aria-describedby="search-addon" />
                                                <button type="button" className="btn btn-primary"><i className="bi bi-search"></i></button>
                                            </div>
                                        </div>
                                        <FriendsNavigation/>
                                    </div>





                                </div>
                            )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyFriendsPending;
