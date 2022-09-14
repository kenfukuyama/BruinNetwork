import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jwt-decode';


// for loggedin context
import {LoggedinContext} from '../context/LoggedinContext';
import { useContext } from 'react';

const Register = () => {
    const {setLoggedinInfo, loggedinInfo} = useContext(LoggedinContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        username: "",
        nickname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });  


    const createUser = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', {
        username: user.username,
        nickname: user.nickname,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword
    }, {withCredentials: true} )
        .then(res => {
            console.log("Registering...");
            const token = res.data.userToken;
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
            console.error(err);
            let errResponse = err.response.data.errors;
            let errObj = {};
            for (const key in errResponse) {
                errObj[key] = errResponse[key].message;
            }
            console.log(errObj);
            setErrors(errObj);

        });
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    }


    return (
        <div className="container g-5 d-flex vh-100 w-md-60 w-lg-40 justify-content-center flex-column fade-in">
            <h6 className="display-6 styled-heading pt-5">Join BruinNetwork</h6>
            <form className="styled-text mt-2 mb-2" onSubmit={createUser} >
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='username'
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        className={`form-control ${errors.username ? "border-danger" : "" }`} />

                    {errors.username ?
                        <span className="form-text text-danger">
                            {errors.username}
                        </span>
                        : <></>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='nickname'
                        name="nickname"
                        value={user.nickname}
                        onChange={handleChange}
                        className={`form-control ${errors.nickname ? "border-danger" : "" }`} />
                    
                    {errors.nickname ?
                        <span className="form-text text-danger">
                            {errors.nickname}
                        </span>
                        : <></>}

                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='email'
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className={`form-control ${errors.email ? "border-danger" : "" }`} />
                    {errors.email ?
                        <span className="form-text text-danger">
                            {errors.email}
                        </span>
                        : <></>}
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder='password'
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className={`form-control ${errors.password ? "border-danger" : "" }`} />

                    {errors.password ?
                        <span className="form-text text-danger">
                            {errors.password}
                        </span>
                        : <></>}
                </div>
                
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder='confirmPassword'
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        className={`form-control ${errors.confirmPassword ? "border-danger" : "" }`} />
                    {errors.confirmPassword ?
                        <span className="form-text text-danger">
                            {errors.confirmPassword}
                        </span>
                        : <></>}
                </div>

                <button type="submit" className="btn btn-light btn-lg mt-1 styled-button">Register</button>
            </form>

            {/* <p className="styled-text">Already have an account? <a href="/accounts/login">Sign In</a></p> */}
            <p className="styled-text">Already have an account? <Link to={"/login"}>Sign In</Link></p>
        </div>
    )
}

export default Register;