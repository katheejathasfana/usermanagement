import axios from "axios";
import React, { useEffect, useState } from "react";
// import Image from './assets/react.svg'
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { logout } from "./Slice/authSice.jsx";
import { useNavigate } from "react-router-dom";
import { clearProfile, setProfile } from "./Slice/profileSlice.jsx";
import API_URL from "../Api.jsx";


function Profile() {

  const profile=useSelector(state=>state.profile)
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [image,setImage]=useState(null)
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("Token");
    
        const response = await axios.get(`${API_URL}/app/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(token)
        const { username, email, phone_no, profile_pic } = response.data.user;
        dispatch(setProfile({ username, email, phone_no, profile_pic }));
        console.log(phone_no)
        setImage(profile_pic)
      
      } catch (error) {
        console.error("Error fetching profile:", +error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("Token");
    try {
      await axios.post(`${API_URL}/app/logout`, null, {
        headers: {
         'Authorization': `Bearer ${token}`
       }
      });
      dispatch(logout());
      dispatch(clearProfile()) // Dispatch the logout action
      localStorage.removeItem("Token");
      navigate("/"); // Navigate to the desired route after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-300 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center relative">
          <Link to="/Edit" className="absolute top-0 right-0 p-4">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <h1 className="text-3xl font-semibold text-center">Welcome {profile.username}</h1>
          <div className="flex justify-center items-center mb-4">
            {image ? (
              <img
                key={image}
                src={`http://127.0.0.1:8000${image}`}
                className="w-20 h-20 rounded-full object-cover mx-auto bg-gray-500"
                alt="Profile"
              />
            ) : (
              <img src={("./assets/react.svg").default} alt="Default" className="w-20 h-20 rounded-full object-cover mx-auto bg-gray-500" />
            )}
          </div>
          <p className="text-gray-700 text-base font-medium">
            Username:
            <h className="font-semibold text-2xl text-gray-900">{profile.username}</h>
          </p>
          <p className="text-gray-700 text-base font-medium">Email: {profile.email}</p>
          <p className="text-gray-700 text-base font-medium">Phone Number: {profile && profile.phone_no}</p>
          <button onClick={handleLogout} className="bg-black text-white hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-4">logout</button>
  </div>
  </div>
  </div>
)}

export default Profile;
