import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../Api';

export const Admin = () => {
    const [adminInfo, setAdminInfo] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setAdminInfo((prevAdminInfo) => ({
            ...prevAdminInfo,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}/app/admin`,
                adminInfo,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const token = response.data.access
           
            localStorage.setItem('Token', token);
            console.log(token)
            navigate('/Dashboard');
        } catch (error) {
            setError(error.response.data.error); 
            console.log(error);
        }
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex bg-gray-300 flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Admin Login
                            </h1>
                            {error && <p>Error: {error}</p>}

                            <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        id="username"
                                        name="username"
                                        type="username"
                                        autoComplete="username"
                                        required
                                        className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter username"
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
                                        onChange={handleChange}
                                        id="password"
                                        name="password"
                                        autoComplete="password"
                                        required
                                        className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Login
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Admin