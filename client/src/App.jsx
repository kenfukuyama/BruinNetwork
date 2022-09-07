import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './views/Main';
import Events from './views/Events';
import EventForm from './views/EventForm';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Register from './views/Register';
import MyEvents from './views/MyEvents';


import Cookies from 'universal-cookie';
import { useState } from 'react';
import jwt from 'jwt-decode';
// import { createContext } from 'react';


// for context
// import AppWrapperComponent from './AppWrapperComponent';
import {LoggedinContext} from './context/LoggedinContext';
import EventFormEdit from './views/EventFormEdit';
import Chatroom from './views/Chatroom';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  // intialize the loggedin status based on the jwt token
  const [loggedinInfo, setLoggedinInfo] = useState({
    loggedin :false,
    loggedinId : null,
    loggedinName : null
  });

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('usertoken');
    let tempLoggedIn = false;
    let tempLggedinId = null;
    let tempedUsername = null;
    if (token) {
      if (jwt(token).id) {
        tempLoggedIn = true;
        tempLggedinId = jwt(token).id;
        // console.log(jwt(token));
        axios.get('http://localhost:8000/api/users/' + tempLggedinId)
            .then(res => {
              // console.log(res);
              tempedUsername = res.data.username;
              // console.log(tempedUsername);
              setLoggedinInfo({
                loggedin :tempLoggedIn,
                loggedinId : tempLggedinId,
                loggedinName : tempedUsername
              });
            })
            .catch(err => console.error(err));
      }
    }
  }, []);


  // const [loggedinId, setLoggedinId] = useState(tempLggedinId);
  // const LoggedinContext = createContext();

  return (
    <div className="App container">
      <LoggedinContext.Provider value={{loggedinInfo, setLoggedinInfo}}>
        <NavBar/>
        
        <Routes>
          {/* // * main routes */}
          <Route element={<Main/>} path="/"/>
          {/* //* Login and registration */}
          <Route element={<Login/>} path="/login"/>
          <Route element={<Register/>} path="/register"/>

          {/* // * event routes */}
          <Route element={<Events/>} path="/events"/>
          <Route element={<EventForm/>} path="/events/new"/>
          <Route element={<MyEvents/>} path="/myevents"/>
          <Route element={<EventFormEdit/>} path="/events/:id/edit"/>
        
          {/* // * chat routes */}
          <Route element={<Chatroom/>} path="/chitchat"/>

          
          
        </Routes>
      </LoggedinContext.Provider>
    </div>
  );
}

export default App;