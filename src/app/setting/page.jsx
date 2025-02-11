'use client'

import { useState, useEffect, useCallback } from 'react';
import { FaKey } from 'react-icons/fa';
import { message } from 'antd';

const Settings = () => {

    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        city: 'New York',
        address: '123 Main St',
        profileImage: 'https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E='
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            setUserId(userData?.userId || null);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchUser = useCallback(async () => {
        try {
            setError(null);
            const data = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '123-456-7890',
                city: 'New York',
                address: '123 Main St',
                profileImage: 'https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E='
            };
            setFormData(data);
        } catch (err) {
            setError('Failed to fetch user data. Please try again later.');
            console.error('Error:', err);
        }
    }, []);

    const handleReset = () => {
        fetchUser();
    };

    useEffect(() => {
        if (userId) {
            fetchUser();
        }
    }, [userId, fetchUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Simulate updating user data
            const updatedUser = { ...formData };
            message.success('Profile updated successfully!');
            console.log('Updated User:', updatedUser);
        } catch (error) {
            console.error('Error updating profile:', error);
            message.error('An error occurred.');
        }
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Profile Settings</h1>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Image Section */}
                <div className="col-span-1">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={formData.profileImage}
                            alt="Profile"
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <h2 className="text-xl font-semibold">{`${formData.firstName} ${formData.lastName}`}</h2>
                        <p className="text-gray-600">{formData.email}</p>
                        <button
                            className="flex items-center gap-2 bg-[#270150] text-white px-4 py-2 rounded hover:bg-[#1a0136] transition-colors duration-200"
                        >
                            <FaKey /> Change Password
                        </button>
                    </div>
                </div>

                {/* Form Fields Section */}
                <div className="col-span-1 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-[#270150]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-[#270150]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-[#270150]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-[#270150]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-[#270150]"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-2 border rounded focus:outline-none focus:border-[#270150]"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={() => window.history.back()}
                            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-[#270150] text-white py-2 px-4 rounded hover:bg-[#1a0136] transition duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
