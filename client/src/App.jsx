import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './views/Main';
import Events from './views/Events';
import EventForm from './components/EventForm';
import NavBar from './components/NavBar';
// import DetailAuthor from './views/DetailAuthor';
// import UpdateAuthor from './views/UpdateAuthor';

function App() {
  return (
    <div className="App container">
      <NavBar/>
      
      <Routes>
        {/* // * main routes */}
        <Route element={<Main/>} path="/"/>

        {/* // * event routes */}
        <Route element={<Events/>} path="/events"/>
        <Route element={<EventForm/>} path="/events/new"/>

        {/* <Route element={<DetailAuthor/>} path="/authors/:id"/> */}
        {/* <Route element={<UpdateAuthor/>} path="/authors/:id/edit"/> */}

        {/* // * chat routes */}

      </Routes>
    </div>
  );
}

export default App;