import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx';
import Profile from './Pages/Profile.jsx'
import EditProfile from './Pages/editUser.jsx';
import Admin from './Pages/admin.jsx'
import Dashboard from './Pages/Dashboard.jsx';
import AddUser from './Pages/addUser.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
function App() {
      const auth=useSelector(state=>state.auth)
      const admin=useSelector(state=>state.admin)
      return (
        <Router>
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route
              path="/"
              element={auth.isAuthenticated ? <Profile /> : <Login />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" 
              element={admin.adminAuth ? <Dashboard/> : <Admin /> } /> 
            <Route path="/Dashboard" element={ <Dashboard />} />
            <Route path="/Edit" element={auth.isAuthenticated ? <EditProfile /> : <Login />} /> 
            <Route path="/Adduser" element={admin.adminAuth ? <AddUser /> : <Admin />} /> 
            </Routes>
        </Router>
      );
    }
    
    export default App;