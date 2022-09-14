import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jwt-decode';
import { Link } from 'react-router-dom';

// for loggedin context
import {LoggedinContext} from '../context/LoggedinContext';
import { useContext } from 'react';


const Login = (props) => {
    const {setLoggedinInfo, loggedinInfo} = useContext(LoggedinContext);

    const navigate = useNavigate();

    const [error, setError] = useState({});

    const [userLogIn, setUserLogIn] = useState({
        email: "",
        password: "",
    });


    const logInUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email: userLogIn.email,
            password: userLogIn.password
        }, {withCredentials: true})
        .then(res => {
            const token = res.data.userToken
            console.log(jwt(token));
            console.log(res);

            // setLoggedin(true);
            // setLoggedinId(jwt(token).id);
            setLoggedinInfo ({ ...loggedinInfo,
                loggedin : true,
                loggedinId : res.data.user._id,
                loggedinUsername : res.data.user.username,
                loadingUser : false
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
        setUserLogIn({...userLogIn, [e.target.name] : e.target.value});

    }


    return (
        <div className="container g-5 d-flex vh-100 w-md-60 w-lg-40 justify-content-center flex-column fade-in">
            <h6 className="display-6 styled-heading mb-2">Log in</h6>

            <form className="styled-text mt-2 mb-2" onSubmit={logInUser} >
                <div className="mb-3">
                    {/* <label className="form-label">email</label><br /> */}
                    <input
                        type="text"
                        placeholder='email'
                        name="email"
                        value={userLogIn.email}
                        onChange={handleChangeLoggedIn}
                        className={`form-control ${error.userId ? "border-danger" : "" }`} />
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
                        className={`form-control ${error.credentials ? "border-danger" : "" }`} />
                    {error.credentials ?
                        <span className="form-text text-danger">
                            {error.credentials}
                        </span>
                        : <></>}
                </div>

                <button type="submit" className="btn btn-light btn-lg mt-1 styled-button">Sign In</button>
            </form>
            {/* <p className="styled-text">Don't have an account? <a href="/accounts/register">Sign Up</a></p> */}
            <p className="styled-text">Don't have an account? <Link to={"/register"}>Sign Up</Link></p>
        </div>
    )
}

export default Login;