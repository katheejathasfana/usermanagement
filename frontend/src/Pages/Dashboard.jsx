import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteusers, fetchusers } from './Slice/userSlice';
import { logout } from './Slice/authSice';

const Dashboard = () => {
    const users = useSelector(state=>state.admin.users);
    const dispatch=useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('Token');
                const response = await axios.get("http://127.0.0.1:8000/app/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                dispatch(fetchusers(response.data.users));
                console.log(users)
            } catch (error) {
                alert(error.message);
            }
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('Token');
        try {
            await axios.post("http://127.0.0.1:8000/app/logout", null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(logout())
            localStorage.removeItem('Token');
            window.location.href = '/admin';
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('Token');
            await axios.post(`http://127.0.0.1:8000/app/delete/${userId}/`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            dispatch(deleteusers(userId));
            alert('User deleted successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full md:w-3/4 lg:w-4/5 xl:w-3/4">
                <h1 className="text-3xl font-bold p-4 text-center">User Dashboard</h1>
                <div className="flex justify-between items-center p-4">
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">Logout</button>
                    <Link to='/Adduser' className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Add User</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Id</th>
                                <th className="px-4 py-2">Username</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone Number</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.slice().reverse().map(user => (
                                <tr key={user.id}>
                                    <td className="border px-4 py-2">{user.id}</td>
                                    <td className="border px-4 py-2">{user.username}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.profile && user.profile.phone_No}</td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-600">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
