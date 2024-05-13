import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [image, setImage]=useState('')
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    profile_pic: '',
    phone_no: ''
  });
  const navigate=useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("Token");
        console.log(token);
        const response = await axios.get("http://127.0.0.1:8000/app/edit", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data)
        setUserInfo({username:response.data.username,
            email:response.data.email,
            phone_no:response.data.phone_no
      });
      setImage(response.data.profile_pic)
        console.log(image)
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', userInfo.username);
      formData.append('email', userInfo.email);
      formData.append('phone_no',userInfo.phone_no)
      formData.append('image', image);
      
      const token = localStorage.getItem("Token");
      console.log(token);
      await axios.post("http://127.0.0.1:8000/app/edit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
      navigate('/profile')
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update User
              </h1>
              <form onSubmit={handleSubmit}  className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={userInfo.username}
                    onChange={handleChange}
                    className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone Number
                  </label>
                  <input
                  type="number"
                  name="phone_no" 
                  value={userInfo.phone_no}
                  onChange={handleChange}
                  className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
/>

                </div>
                <div>
                  <label htmlFor="profile_pic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profile_pic"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gray-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}
export default EditProfile;
