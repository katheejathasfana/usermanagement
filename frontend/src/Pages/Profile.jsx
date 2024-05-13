import axios from "axios";
import React, { useEffect, useState } from "react";
// import Image from './assets/react.svg'
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { logout } from "./Slice/authSice.jsx";
import { useNavigate } from "react-router-dom";
import { setProfile } from "./Slice/profileSlice.jsx";


function Profile() {

  const profile=useSelector(state=>state.profile)
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [image,setImage]=useState(null)
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("Token");
    
        const response = await axios.get("http://127.0.0.1:8000/app/profile", {
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
      await axios.post("http://127.0.0.1:8000/app/logout", null, {
        headers: {
         'Authorization': `Bearer ${token}`
       }
      });
      dispatch(logout()); // Dispatch the logout action
      localStorage.removeItem("Token");
      navigate("/"); // Navigate to the desired route after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 m-5 md:space-y-6 sm:p-8 flex flex-col items-center relative">
          <Link to="/Edit" className="absolute top-0 right-0 p-4">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <h1 className="text-3xl font-semibold">Welcome {profile.username}</h1>
          {image? (
            <img
              key={image}
              src={`http://127.0.0.1:8000${image}`}
              className="w-30 h-25 rounded-md"
              alt="Profile"
            />
          ) : (
            <img src={Image} alt="Default" />
          )}
          <p>
            Username:
            <h className="font-semibold text-2xl">{profile.username}</h>
          </p>
          <p>Email: {profile.email}</p>
          <p>Phone Number: {profile && profile.phone_no}</p>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
