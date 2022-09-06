import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './views/Main';
import Events from './views/Events';
import EventForm from './views/EventForm';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Register from './views/Register';


import Cookies from 'universal-cookie';
import { useState } from 'react';
import jwt from 'jwt-decode';
// import { createContext } from 'react';

// for context
// import AppWrapperComponent from './AppWrapperComponent';
import {LoggedinContext} from './context/LoggedinContext';


function App() {
  // intialize the loggedin status based on the jwt token
  const cookies = new Cookies();
  const token = cookies.get('usertoken');
  let tempLoggedIn = false;
  if (token) {
    if (jwt(token).id) {
      tempLoggedIn = true;
    }
  }

  const [loggedin, setLoggedin] = useState(tempLoggedIn);
  // const LoggedinContext = createContext();

  return (
    <div className="App container">
      <LoggedinContext.Provider value={{loggedin, setLoggedin}}>
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
        
          {/* <Route element={<UpdateAuthor/>} path="/authors/:id/edit"/> */}
          {/* // * chat routes */}
        </Routes>
      </LoggedinContext.Provider>
    </div>
  );
}

export default App;