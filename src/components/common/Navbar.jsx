'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Navlink = ({ onExpand, isSideBarCollaped }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  
  const [userData, setUserData] = useState({});
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData') || '{}'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    router.push('/');
  };

  const dropdownItems = [
    {
      name: 'Profile Settings',
      icon: <FaUserCog />,
      link: '/mysettings',
      onClick: () => router.push('/mysettings')
    },
    {
      name: 'Logout',
      icon: <FaSignOutAlt />,
      link: '/',
      onClick: handleLogout
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 right-0 min-w-full z-50 border-b-4 border-sky-400 text-white p-4 flex items-center h-16 bg-[#270150] transition-colors duration-200" >
        <button
          onClick={onExpand}
          className={`text-white ml-4 text-3xl focus:outline-none hover:text-sky-300 transition-colors duration-200 ${isSideBarCollaped ? 'mr-4' : 'hidden'}`}
        >
          <FaBars />
        </button>
        <h1 className="text-white text-2xl font-bold hover:text-sky-300 transition-colors duration-200">Home Installment System</h1>
        <div className="ml-auto relative flex items-center gap-2" ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)}>
          <img

            src="https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E="
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-white hover:border-sky-300 cursor-pointer transition-colors duration-200"
          />
          <div className="text-right">
            <p className="text-sm font-semibold mb-0 cursor-pointer">{userData?.userName || 'Guest'}</p>
            <p className="text-xs text-gray-300 mb-0 cursor-pointer">Administrator</p>
          </div>
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              {dropdownItems.map((item, index) => (
                <button 
                  key={index}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#270150] hover:text-white transition-colors duration-200 flex items-center gap-2"
                  onClick={item.onClick}
                >
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navlink;
