import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaUsers } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";


const sidebarItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <BiSolidDashboard className="mr-2" /> },
  { href: '/employees', label: 'Employees', icon: <FaUsers className="mr-2" /> },
  { href: '/installments', label: 'Installments', icon: <AiFillDollarCircle className="mr-2" /> },
  { href: '/setting', label: 'Settings', icon: <IoSettingsSharp className="mr-2" /> }
];

const Sidebar = ({ isCollapsed, onCollapse }) => {
  const pathname = usePathname();

  return (
    <div className={`fixed top-16 bg-white h-full border-r-2 border-gray-300 text-black transition-all duration-500 ${isCollapsed ? 'w-0' : 'w-52'} overflow-hidden z-50`}>
    <div className="flex">
      <div className="flex-grow mt-5 ml-5">
        <ul className="list-none p-0 m-0">
          {sidebarItems.map(({ href, label, icon }) => (
            <li key={href} className="mb-2 text-left">
              <Link
                href={href}
                className={`flex items-center cursor-pointer text-sm lg:text-lg tabHover ${pathname === href ? 'tabActive' : 'p-2'}`}   
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-around h-screen">
        <div
          onClick={onCollapse}
          className="h-20 w-3 bg-gray-200 hover:bg-[#270150] focus:outline-none px-2 cursor-pointer rounded-l-md mb-16"
        />
      </div>
    </div>
  </div>
  );
};

export default Sidebar;