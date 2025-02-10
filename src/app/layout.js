"use client";

import '@ant-design/v5-patch-for-react-19';
import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleCollapseSidebar = () => {
    setIsSidebarCollapsed(true);
  };

  const handleExpandSidebar = () => {
    setIsSidebarCollapsed(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const protectedRoutes = ['/dashboard', '/inventory', '/contacts', '/mysettings'];
  //   const userData = localStorage.getItem('userData');
    
  //   if (protectedRoutes.includes(pathName) && !userData) {
  //     router.push('/');
  //   }
  // }, [pathName, router]);

  const showNavAndSidebar = pathName !== '/';

  return (
    <html lang="en">
      <body>
        <div className="App scroll-smooth h-screen overflow-y-auto">
          {showNavAndSidebar && (
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
              <Navbar
                onExpand={handleExpandSidebar}
                isSideBarCollaped={isSidebarCollapsed}
              />
            </div>
          )}

          <div className={`flex ${showNavAndSidebar ? 'mt-20' : ''}`}>
            {showNavAndSidebar && (
              <Sidebar
                isCollapsed={isSidebarCollapsed}
                onCollapse={handleCollapseSidebar}
              />
            )}

            <div
              className={`flex-1 min-h-full transition-all overflow-hidden duration-500 ${
                showNavAndSidebar && !isSidebarCollapsed ? "ml-56" : ""
              }`}
            >
              <main className="flex-1 overflow-x-auto">
                {children}
                <Toaster />
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
