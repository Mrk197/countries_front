import {Routes, Route, useLocation} from 'react-router-dom';

import Landing from './views/landing/landing';
import Home from './views/home/home';
import Detail from './views/detail/detail';
import ActivityForm from './views/activityForm/activityForm';
import Error from './views/error/error';
import NavBar from './components/navbar/navbar';
import NavBarFiltros from './components/navbar/navbarFiltros';
import Activities from './views/activities/activities';

import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && location.pathname !== "/home"  && <NavBar />}
      {location.pathname === "/home" && <NavBarFiltros />}
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/:idCountry" element={<Detail/>} />
        <Route path="/newActivity" element={<ActivityForm/>} />
        <Route path="/activities" element={<Activities/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
