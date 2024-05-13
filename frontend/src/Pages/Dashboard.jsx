import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('Token');
                console.log(token)
                const response = await axios.get("http://127.0.0.1:8000/app/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUsers(response.data.users);
                console.log(users);
            } catch (error) {
                alert(error.message);
            }
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('Token');
        console.log(token);
        try {
            await axios.post("http://127.0.0.1:8000/app/logout", null, {
              headers: {
               'Authorization': `Bearer ${token}`
             }
            });
            localStorage.removeItem('Token');
            window.location.href = '/admin';
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('Token');
            const response =await axios.post(`http://127.0.0.1:8000/app/delete/${userId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers(users.filter(user => user.id !== userId));
            alert('User deleted successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full md:w-3/4 lg:w-1/2">
                <h1 className="text-2xl font-bold p-4 flex justify-center ">User Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
                <Link to='/Adduser'><button>adduser</button></Link>
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
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="border px-4 py-2">{user.id}</td>
                                    <td className="border px-4 py-2">{user.username}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.profile && user.profile.phone_No}</td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => handleDelete(user.id)}>
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
