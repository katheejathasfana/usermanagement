import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx';
import Profile from './Pages/Profile.jsx'
import EditProfile from './Pages/editUser.jsx';
import Admin from './Pages/admin.jsx'
import Dashboard from './Pages/Dashboard.jsx';
import AddUser from './Pages/addUser.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
        return (
          <Router>
           
            <Routes>
               <Route path="/signup" element={<Register/>}/>
              <Route  path="/" element={<Login/>}/>
              <Route  path="/profile" element={<Profile />}/> 
              <Route path="/admin" element={<Admin/>}/> 
              <Route path="/Dashboard" element={<Dashboard/>}/>
              <Route path="/Edit" element={<EditProfile />}/>  
              <Route path="/Adduser" element={<AddUser />}/>    
            </Routes>
            
          </Router>
        )
      }
      
    


  
  


export default App
