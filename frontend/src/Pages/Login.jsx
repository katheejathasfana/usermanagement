import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./Slice/authSice.jsx";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // const profile=useSelector((state)=>state.profile)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/app/", {
        username,
        password,
      });
      console.log(response.data);
      dispatch(
        login({
          accessToken: response.data.access,
          refreshToken: response.data.refresh,
        })
      );
  
      console.log(response.data.access)
      localStorage.setItem("Token", response.data.access);
      setSuccess("Logged in successfully");
      navigate("/profile"); 

    } catch (error) {
      setError("Invalid username or password");
      navigate('/')
    }
  };
  
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex bg-gray-300 flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              {error && <p> {error}</p>}

              {success && <p>Success: {success}</p>}
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    id="username"
                    className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="password"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  don't have an account? <Link to="/signup">Signup here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Login;