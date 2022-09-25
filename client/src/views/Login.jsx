import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import jwt from 'jwt-decode';
import { Link } from 'react-router-dom';

// for loggedin context
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';


const Login = (props) => {
    const { setLoggedinInfo, loggedinInfo } = useContext(LoggedinContext);

    const navigate = useNavigate();

    const [error, setError] = useState({});


    // * anchor
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popper' : undefined;

    const [userLogIn, setUserLogIn] = useState({
        email: "",
        password: "",
    });


    const logInUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email: userLogIn.email,
            password: userLogIn.password
        }, { withCredentials: true })
            .then(res => {
                // const token = res.data.userToken
                // console.log(jwt(token));
                // console.log(res);

                // setLoggedin(true);
                // setLoggedinId(jwt(token).id);
                setLoggedinInfo({
                    ...loggedinInfo,
                    loggedin: true,
                    loggedinId: res.data.user._id,
                    loggedinUsername: res.data.user.username,
                    loadingUser: false
                })
                navigate('/');

            })
            .catch(err => {
                // console.error(err);
                // setError(err.response.data);
                let errResponse = err.response.data;
                let errObj = {};
                for (const key in errResponse) {
                    errObj[key] = errResponse[key];
                }
                // console.log(errObj);
                setError(errObj);

            });
    }


    const handleChangeLoggedIn = (e) => {
        setUserLogIn({ ...userLogIn, [e.target.name]: e.target.value });

    }


    return (
        <div className="container g-5 d-flex vh-100 w-md-60 w-lg-40 justify-content-center flex-column fade-in">
            <h6 className="display-6 styled-heading mb-2">Log in</h6>

            <form className="styled-text mt-2 mb-2" onSubmit={logInUser} >
                <div className="mb-3">
                    {/* <label className="form-label">email</label><br /> */}
                    <input
                        type="text"
                        placeholder='username or email'
                        name="email"
                        value={userLogIn.email}
                        onChange={handleChangeLoggedIn}
                        className={`form-control ${error.userId ? "border-danger" : ""}`} />
                    {error.userId ?
                        <span className="form-text text-danger">
                            {error.userId}
                        </span>
                        : <></>}
                </div>
                <div className="mb-3">
                    {/* <label className="form-label">password</label><br /> */}
                    <input
                        type="password"
                        placeholder='password'
                        name="password"
                        value={userLogIn.password}
                        onChange={handleChangeLoggedIn}
                        className={`form-control ${error.credentials ? "border-danger" : ""}`} />
                    {error.credentials ?
                        <span className="form-text text-danger">
                            {error.credentials}
                        </span>
                        : <></>}
                </div>

                <button type="submit" className="btn btn-light btn-lg mt-1 styled-button">Sign In</button>
            </form>
            {/* <p className="styled-text">Don't have an account? <a href="/accounts/register">Sign Up</a></p> */}
            <p className="styled-text mt-2 mb-0">Don't have an account? <Link to={"/register"}>Sign Up</Link></p>
            <p className="styled-text mb-0 d-flex justify-content-center align-items-center">Forgot Password<IconButton aria-describedby={popId} onClick={handleClick}>
                <InfoIcon fontSize="small" style={{ color: "#888" }} />
            </IconButton>
            </p>


            <Popper
                id={popId}
                open={open}
                anchorEl={anchorEl}
                placement="left-start"
                
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
                <Box sx={{ border: 1, pt: 1, px: 1, bgcolor: 'background.paper', width: "300px", borderRadius: "15px", borderColor: "#808080" }}>
                    <div className="d-flex justify-content-end">
                        <div className="close-button">
                            <IconButton onClick={handleClick}>
                                <CloseIcon fontSize="small" sx={{ color: "#000" }} />
                            </IconButton>
                        </div>
                    </div>
                    <p className='text-small text-muted text-wrap text-center'>
                        If you have trouble accessing your existing account, please email <strong>bruinnetwork.connect@gmail.com</strong> for further instructions. Please send a message using the email you used to sign up.
                    </p>
                </Box>

            </Popper>


        </div>
    )
}

export default Login;