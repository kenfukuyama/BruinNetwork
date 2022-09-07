import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {LoggedinContext} from '../context/LoggedinContext';
import { useContext } from 'react';

const Logout = () => {
    const navigate = useNavigate();
    const {setLoggedinInfo} = useContext(LoggedinContext);
    
    const logout = (e) => {
        // e.preventDefault();

        axios.get('http://localhost:8000/api/logout', {withCredentials: true} )
        .then(res => { 
            console.log(res);
            setLoggedinInfo ({
                loggedin : false,
                loggedinId : null,
                loggedinName : null
            })
            navigate('/');

        })
        .catch(err =>{ console.error(err);});
    }

    return (
        <button className="btn nav-link text-white" onClick={logout}><i className="bi bi-box-arrow-left nav-icon"></i>Logout</button>
    )


}

export default Logout;