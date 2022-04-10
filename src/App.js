import './App.css';
import SideMenu from './components/SideMenu';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import NewUser from './screens/NewUser';
import EditUser from './screens/EditUser';
import Users from './screens/Users';

import { useState } from 'react';

function App() {

  const [ sidebarActive, setSidebarActive ] = useState(false); 

  return (
    <div className="App">
      <BrowserRouter>

        <SideMenu onCollapse={(inactive) => {
          setSidebarActive(inactive);
        }} />
 
        <div className={`container ${sidebarActive ? 'inactive' : ''}`}>
          <Routes>
            <Route path='/' element={<Users />} />
              
            <Route path='/new-user' element={<NewUser />} />
            <Route path='/edit-user' element={<EditUser />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
