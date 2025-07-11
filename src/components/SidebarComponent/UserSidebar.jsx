import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import API from '../../Apis';
import LogoutButton from '../authComponent/LogoutButton';
import {
  FaSignOutAlt,
  FaUser,
  FaSmile,
  FaChartLine,
  FaLightbulb,
  FaTachometerAlt,
} from 'react-icons/fa';
import { API_ROUTES } from '../../constants/apiRoutes';

const UserSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    API.get(API_ROUTES.VIEW_PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error('Sidebar profile load failed', err));
  }, []);

  const menuItems = [
    { to: '/user/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { to: '/user/profile', icon: <FaUser />, label: 'Profile' },
    { to: '/user/moodlog', icon: <FaSmile />, label: 'Moodlog' },
    { to: '/user/moodhistory', icon: <FaChartLine />, label: 'Mood History' },
    { to: '/user/suggestion', icon: <FaLightbulb />, label: 'Suggestion' },
  ];

  return (
    <div
      className={`h-screen bg-[#481D39] text-white flex flex-col justify-between transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'
        }`}
    >
      {/* Top Toggle Button */}
      <div className="flex justify-end p-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white bg-[#5a2748] p-2 rounded-full hover:bg-pink-400 transition"
          title={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="pb-4 border-b border-white/20 flex flex-col items-center justify-center space-y-2">
        <img
          src={
            user?.profileImage
              ? `https://zenvibe-backend.onrender.com/uploads/${user.profileImage}`
              : 'https://i.pravatar.cc/100?img=3'
          }
          alt="Profile"
          className={`rounded-full border-4 border-white object-cover transition-all duration-300 ${isSidebarOpen ? 'w-20 h-20' : 'w-12 h-12'
            }`}
        />
        {isSidebarOpen && (
          <>
            <p className="text-white font-semibold text-l">
              {user?.username
                ? user.username
                  .toLowerCase()
                  .split(/\s+/) 
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
                : 'User'}
            </p>
            <p className="text-white text-m opacity-70">{user.email || ''}</p>
          </>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 mt-6 space-y-2 p-2">
        {menuItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 rounded-full transition-colors duration-200 ${isActive
                ? 'bg-white bg-opacity-20 text-white'
                : 'text-white text-opacity-70 hover:bg-white hover:bg-opacity-10'
              }`
            }
            title={label}
          >
            <div className="text-lg">{icon}</div>
            {isSidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/20">
        <LogoutButton
          icon={<FaSignOutAlt size={16} />}
          label={isSidebarOpen ? 'Logout' : ''}
        />
      </div>
    </div>
  );
};

export default UserSidebar;
