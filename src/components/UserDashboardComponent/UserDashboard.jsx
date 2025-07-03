import MoodAnalyticsChart from '../MoodLogComponent/MoodAnalytics';
import { useEffect, useState } from 'react';
import API from '../../Apis';
import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa'; // Notification icon
import { API_ROUTES } from '../../constants/apiRoutes';

const UserDashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(API_ROUTES.VIEW_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-6 min-h-screen bg-[#fffaf5]"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ac6f82]">
            Hello, {user.username || 'Loading...'} 
          </h2>
          <p className="text-xl font-semibold text-[#ac6f82]">
            Here's a quick glance at your mood journey today
          </p>
          <p className="text-md mt-2 text-[#ac6f82]">
            Keep tracking and improving your emotional well-being
          </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-64">
            <span className="absolute inset-y-0 left-3 flex items-center text-[#ac6f82] text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-1.5 rounded-full border border-[#ac6f82] text-sm text-[#660e60] placeholder-[#ac6f82] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#893f71] transition"
            />
          </div>
          <div className="p-3 bg-[#ac6f82] text-white rounded-full cursor-pointer hover:bg-[#893f71] transition">
            <FaBell />
          </div>
        </div>
      </div>
      <MoodAnalyticsChart />
    </motion.div>
  );
};

export default UserDashboard;
