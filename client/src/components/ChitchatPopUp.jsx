import React from 'react'

import {LoggedinContext} from '../context/LoggedinContext';
import { useContext } from 'react';

import RingLoader from 'react-spinners/RingLoader';


function ChitchatPopUp() {
    // const cookies = new Cookies();
    // const [cookies, setCookies] = useState(new Cookies());
    const {loggedinInfo} = useContext(LoggedinContext);
    

    return (
        <>
            <RingLoader size={100} loading={loggedinInfo.isInQueue} cssOverride={{ display: "block", position: "fixed", bottom: "10%", left: "10%"}} />
        </>

    )
}

export default ChitchatPopUp;