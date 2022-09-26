import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './views/Main';
import Events from './views/Events';
import GuestEvents from './views/GuestEvents';
import EventForm from './views/EventForm';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Register from './views/Register';
import MyPostedEvents from './views/MyPostedEvents';
// import MySavedEvents  from './views/MySavedEvents';
import MySavedEventsCalendar from './views/MySavedEventsCalendar';
import MySavedEventsList from './views/MySavedEventsList';
import Chatrooms from './views/Chatrooms';
import ChitchatPopUp from './components/ChitchatPopUp';


import Cookies from 'universal-cookie';
import { useState } from 'react';
import jwt from 'jwt-decode';
// import { createContext } from 'react';
import GuestEventPage from './views/GuestEventPage';

import MyUserAccount from './views/MyUserAccount'

// for context
// import AppWrapperComponent from './AppWrapperComponent';
import {LoggedinContext} from './context/LoggedinContext';
import EventFormEdit from './views/EventFormEdit';
import ChatroomPublic from './views/ChatroomPublic';
import Chitchat from './views/Chitchat';
import ChitchatLobby from './views/ChitchatLobby';
import UserPage from './views/UserPage';
// import ChitchatBot from './views/ChitchatBot';

import MyFriends from './views/MyFriends';
import Users from './views/Users';
import MyFriendsPending from './views/MyFriendsPending';
import UserFriendsPage from './views/UserFriendsPage';
import MyNotificationsRequests from './views/MyNotificationsRequests';
import MyNotificationsSpirits from './views/MyNotificationsSpirits';
import EventPage from './views/EventPage';
import GuestChatrooms from './views/GuestChatrooms';

// import axios from 'axios';
// import { useEffect } from 'react';

function App() {
  // intialize the loggedin status based on the jwt token
    let beat = new Audio('/chat.mp3');


  // useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('usertoken');
    let tempLoggedIn = false;
    let tempLggedinId = null;
    // let tempedUsername = null;
    if (token) {
      if (jwt(token).id) {
        tempLoggedIn = true;
        tempLggedinId = jwt(token).id;
        // console.log(jwt(token));

        // setLoggedinInfo({
        // });

        // axios.get('http://localhost:8000/api/users/' + tempLggedinId)
        //     .then(res => {
        //       // console.log(res);
        //       tempedUsername = res.data.username;
        //       console.log(tempedUsername);
        //       setLoggedinInfo({
        //         loggedin :tempLoggedIn,
        //         loggedinId : tempLggedinId,
        //         loggedinName : tempedUsername,
        //         loadingUser: false
        //       });
        //       // setLoggedinInfo({ ...loggedinInfo, loadingUser: false});
        //     })
        //     .catch(err => {console.error(err); setLoggedinInfo({
        //       loggedin :false,
        //       loggedinId : null,
        //       loggedinName : null,
        //       loadingUser: false
        //     });})
            // .finally(() => {setLoggedinInfo({ ...loggedinInfo, loadingUser: false})});
      }
    }
    
  // }, []);
  const [loggedinInfo, setLoggedinInfo] = useState({
    loggedin :tempLoggedIn,
    loggedinId : tempLggedinId,
    loggedinUsername : null,
    loadingUser: false,
    isInQueue : false,
    timeOutId : null,
    chitchatRoom : null
  });

  const [chitchatRoomId, setChitchatRoomId] = useState([false, null]);


  // const [loggedinId, setLoggedinId] = useState(tempLggedinId);
  // const LoggedinContext = createContext();

  return (
    <div className="App container">
      <LoggedinContext.Provider value={{loggedinInfo, setLoggedinInfo, chitchatRoomId, setChitchatRoomId}}>
        <NavBar/>
        <ChitchatPopUp/>
        
        <Routes>
          {/* // * main routes */}
          <Route element={<Main/>} path="/"/>
          {/* //* Login and registration */}
          <Route element={<Login/>} path="/login"/>
          <Route element={<Register/>} path="/register"/>

          {/* // * Other users route */}
          <Route element={<Users/>} path="/users"/>
          <Route element={<UserPage/>} path="/users/:id"/>
          <Route element={<UserFriendsPage/>} path="/users/friends/:id"/>
 
          {/* // * My User Route */}
          <Route element={<MyUserAccount/>} path="/users/account"/>
          <Route element={<MyFriends/>} path="/users/friends"/>
          <Route element={<MyFriendsPending/>} path="/users/friends/pending"/>
          {/* <Route element={<ChitchatBot/>} path="/users/chat/"/> */}
          <Route element={<MyNotificationsSpirits/>} path="/users/notifications/spirits"/>
          <Route element={<MyNotificationsRequests/>} path="/users/notifications/requests"/>

          {/* // * event routes */}
          <Route element={<Events/>} path="/events"/>
          <Route element={<EventForm/>} path="/events/new"/>
          <Route element={<MySavedEventsCalendar/>} path="/myevents/saved/calendar"/>
          <Route element={<MySavedEventsList/>} path="/myevents/saved/list"/>
          <Route element={<MyPostedEvents/>} path="/myevents/posted"/>
          <Route element={<EventFormEdit/>} path="/events/:id/edit"/>
          <Route element={<EventPage/>} path="/events/:id/"/>
        
          {/* // * chat routes */}
          <Route element={<ChitchatLobby/>} path="/chitchat"/>
          <Route element={<ChatroomPublic beat={beat}/>} path="/chatroom/:roomId"/>
          <Route element={<Chitchat beat={beat}/>} path="/chitchat/:roomId"/>
          <Route element={<Chatrooms/>} path="/chatrooms"/>
          

          {/* // Guests routes */}
          <Route element={<GuestEvents/>} path="/guests/events"/>
          <Route element={<GuestEventPage/>} path="/guests/events/:id"/>
          <Route element={<GuestChatrooms/>} path="/guests/chatrooms"/>
          
        </Routes>
      </LoggedinContext.Provider>
    </div>
  );
}

export default App;