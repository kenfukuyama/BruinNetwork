import React, { useEffect } from 'react'

import {LoggedinContext} from '../context/LoggedinContext';
import { useContext } from 'react';

import RingLoader from 'react-spinners/RingLoader';

import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useRef } from 'react';


import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { blue } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import { useState } from 'react';




function ChitchatPopUp() {
    // const cookies = new Cookies();
    // const [cookies, setCookies] = useState(new Cookies());
    const navigate = useNavigate();
    const {loggedinInfo, chitchatRoomId, setChitchatRoomId} = useContext(LoggedinContext);
    const [otherUser, setOtherUser] = useState(null);

    // const [state, setState] = useState({visible: true});
    // const [connectionMade, setConnectionMade] = useState(chitchatRoomId !== null);
    
    
    const closeModal = () => {
        // console.log("cloging modal...");
        setChitchatRoomId([false, null]);
        // setConnectionMade(false);
    }
    const closeModalEnterChat = (e) => {
        navigate(`/chitchat/${chitchatRoomId[1]}`);
        setChitchatRoomId([false, null]);
    }

    // useEffect(() => {
    //     Modal.setAppElement('#root');
    // }, [])
    // parentSelector={() => document.querySelector('#root')}

    const customStyles = {
        content: {
            
            maxHeight: '60%',
            maxWidth: "50%",
            margin: '0 auto',
            position: "fixed",
            padding: '0',
            top: "20%",
            textAlign: 'center',
            overflow: 'auto',
            // zIndex: "99"
            borderRadius: "30px",
            // position : "relative"

        },
        overlay : {
            backgroundColor: "rgb(36, 61, 132, 0.40)",
        }
    };

    useEffect(() => {
        if (chitchatRoomId[1] !== null) {
            let otherUserId = chitchatRoomId[1].replace(loggedinInfo.loggedinId, "");
            axios.get('http://localhost:8000/api/users/' + otherUserId)
            .then(res => {
                // let otherUser = res.data;
                console.log(res.data);
                // otherUser.current = res.data;
                setOtherUser(res.data);
            })
            .finally(() => {});

        }

    // eslint-disable-next-line
    }, [chitchatRoomId]) 

    return (
        <>
            <RingLoader 
            size={100} 
            loading={loggedinInfo.isInQueue} 
            cssOverride={{ display: "block", position: "fixed", bottom: "5%", left: "5%", cursor: "pointer"}} 
            onClick={() => navigate("/chitchat")}/>


                    <Modal
                        ariaHideApp={false}
                        isOpen={chitchatRoomId[0]}
                        // onAfterOpen={this.afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        className=""
                        contentLabel="Chitchat Popup"
                        closeTimeoutMS={1000}
                        
                                >
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="w-100">

                        {!otherUser ?  <></> : 


                        <div className="fade-in card border-0">
                            <div className="card-body p-4 text-black">
                                {/* <div>
                                                <h6 className="mb-4">Exquisite hand henna tattoo</h6>
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <p className="small mb-0"><i className="far fa-clock me-2"></i>3 hrs</p>
                                                    <p className="fw-bold mb-0">$90</p>
                                                </div>
                                            </div> */}
                                <div className="d-flex align-items-center mb-4 justify-content-center">
                                    <div className="d-flex userName align-items-center">
                                        <div className="">
                                            {/* <img src=""
                                                            alt="Generic placeholder image" className="img-fluid rounded-circle border border-dark border-3"
                                                        style={{width: "70px"}}/> */}
                                            <Avatar sx={{ bgcolor: blue[500] }}>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </div>
                                        <div className="d-flex flex-column ms-3">
                                            <div className="">
                                                <h4 className="mb-0">{otherUser.nickname}</h4>
                                            </div>
                                            <div className="">
                                                <p className="mb-0">(@{otherUser.username})</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <hr/> */}
                                <div className="row my-4">
                                    <div className="col-sm-3">
                                        <p className="text-muted mb-0">Year</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className={`mb-0 ${otherUser.year.length > 1 && otherUser.year[1] ? "" : "text-muted"}`}>{otherUser.year.length > 1 && otherUser.year[1] ? otherUser.year[1] : "No information yet"}</p>

                                    </div>
                                </div>
                                {/* <hr/> */}
                                <div className="row my-4">
                                    <div className="col-sm-3">
                                        <p className="text-muted mb-0">Major</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className={`mb-0 ${otherUser.major ? "" : "text-muted"}`}>{otherUser.major ? otherUser.major : "No information yet"}</p>
                                    </div>
                                </div>

                                <div className="row d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="col-sm-3">
                                        <h6 className="text-muted ms-4" style={{ textAlign: "left" }} >Contact</h6>
                                    </div>

                                    {
                                        otherUser.instagramUsername ?
                                            <div className="col-sm-9 d-flex h5 align-items-center justify-content-center gap-2 btn" onClick={(e) => { window.open(`https://www.instagram.com/${otherUser.instagramUsername}`) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                                </svg>
                                                <div className="div">
                                                    <p className="" style={{ marginBottom: "0px" }}>{otherUser.instagramUsername}</p>
                                                </div>
                                            </div> : <p></p>
                                    }

                                </div>

                                <hr className="mt-0 mb-4" />
                                <div className="row pt-1">
                                    <div className="mb-3">
                                        <p className={`${otherUser.bio ? "" : "text-muted"}`}>{otherUser.bio ? otherUser.bio : "No information yet"}</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-center">
                                    
                                </div>

                                <h6 className="text-muted ms-3" style={{ textAlign: "left" }} >Interests</h6>
                                <hr className="mt-0" />
                                <div className="row pt-1">

                                    <div className="d-flex gap-2 w-100 flex-wrap justify-content-center">
                                        {Object.keys(otherUser.interests).length > 0 ?
                                            Object.keys(otherUser.interests).map((interest, i) => {
                                                return <Chip label={interest} color="success" key={i} />
                                            }) : <p className="text-muted">No information yet</p>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    }
                            <div className="d-flex justify-content-center align-items-center">
                                <button className='btn btn-success my-3 w-50 rounded-pill' onClick={closeModalEnterChat}>Chat</button>
                            </div>
                        </div>
                    </div>
                    {/* <button className='btn btn-success my-3 w-50 rounded-pill me-3' style={{position: 'absolute', bottom : "5%", right :"15%"}}onClick={closeModalEnterChat}>Chat</button>
                     */}


                    </Modal>

            
            

            
        </>

    )
}

export default ChitchatPopUp;