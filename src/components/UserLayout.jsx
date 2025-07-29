import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './SidebarComponent/UserSidebar';
import Footer from './FooterComponent/Footer';
import { useTheme } from '../context/ThemeContext';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme } = useTheme();

  // Automatically collapse sidebar on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      const saved = localStorage.getItem('userSidebarOpen');
      setIsSidebarOpen(saved === 'true');
    }
  }, []);

  // Save sidebar state in localStorage
  useEffect(() => {
    localStorage.setItem('userSidebarOpen', isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex">
        <div className={`h-screen fixed top-0 left-0 z-40 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
          <UserSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <div className={`flex-1 min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <main>
            <Outlet />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
