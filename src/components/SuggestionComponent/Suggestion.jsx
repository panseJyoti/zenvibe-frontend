import { useEffect, useState } from 'react';
import API from '../../Apis';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { API_ROUTES } from '../../constants/apiRoutes';

const Suggestions = () => {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState('All');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await API.get(API_ROUTES.GET_USER_MOODS);
        let moodList = [];

        if (Array.isArray(res.data)) {
          moodList = res.data;
        } else if (Array.isArray(res?.data?.moods)) {
          moodList = res.data.moods;
        }

        setMoods([{ _id: 'All', name: 'All' }, ...moodList]);
      } catch (err) {
        console.error('Failed to load moods:', err);
      }
    };

    fetchMoods();
  }, []);

  const fetchActivities = async (moodId) => {
    try {
      const res = await API.get(API_ROUTES.GET_ACTIVITIES, {
        params: moodId !== 'All' ? { mood: moodId } : {},
      });
      setActivities(res.data?.activities || []);
    } catch (err) {
      console.error('Error fetching activities:', err);
    }
  };

  useEffect(() => {
    fetchActivities(selectedMood);
  }, [selectedMood]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#fffaf5] dark:bg-gray-900 p-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header & Dropdown */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-4xl font-extrabold text-[#660e60] dark:text-white text-center sm:text-left">
            Activity Suggestions
          </h2>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 text-[#660e60]" size={18} />
            <select
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#893f71] bg-white text-[#660e60] font-semibold shadow-md focus:ring-2 focus:ring-[#ac6f82] dark:bg-gray-800 dark:text-white"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
            >
              {moods.map((mood) => (
                <option key={mood._id} value={mood._id}>
                  {mood.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Activity Cards */}
        {activities.length === 0 ? (
          <p className="text-center text-[#893f71] text-lg mt-6">No activities found for selected mood.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {activities.map((activity) => (
              <motion.div
                key={activity._id}
                whileHover={{ scale: 1.03 }}
                className="bg-[#cfa093] hover:bg-[#ac6f82] transition-all duration-300 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[#893f71]"
              >
                {activity.image && (
                  <img
                    src={`https://zenvibe-backend.onrender.com/uploads/${activity.image}`}
                    alt={activity.name}
                    className="w-full h-36 object-cover"
                  />
                )}
                <div className="p-3 text-center">
                  <h3 className="text-base font-semibold text-white line-clamp-1">{activity.name}</h3>
                  <p className="text-xs text-white/90 mt-1 line-clamp-3">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        )}
      </div>
    </motion.div>
  );
};

export default Suggestions;
