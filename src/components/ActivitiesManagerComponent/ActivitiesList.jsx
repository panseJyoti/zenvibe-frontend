import { useEffect, useState } from 'react';
import API from '../../Apis';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import EditActivityModal from './EditActivity';
import { API_ROUTES } from '../../constants/apiRoutes';

function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const res = await API.get(API_ROUTES.ACTIVITY_LIST);
      console.log(res.data);
      setActivities(res.data.activities || []);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch activities');
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) return;
    try {
      await API.delete(API_ROUTES.DELETE_ACTIVITY(id));
      toast.success('Activity deleted successfully!');
      setActivities((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to delete activity');
    }
  };

  return (
    <motion.div
      className="min-h-screen p-6 bg-[#fffaf5] dark:bg-gray-900"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-[#660e60] text-white px-4 py-2 rounded hover:bg-[#893f71] transition"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center text-[#660e60]">All Activities</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {activities.length === 0 && !error && <p className="text-center">No activities found.</p>}

        {/* Activity Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activities.map((activity) => (
            <motion.div
              key={activity._id}
              whileHover={{ scale: 1.02 }}
              className="relative bg-white border border-[#cfa093] rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {activity.image && (
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-36 object-cover"
                />
              )}

              {/* AI Generated Badge */}
              {activity.isAI && (
                <span className="absolute top-2 right-2 bg-[#f3d0a4] text-[#893f71] text-xs font-semibold px-2 py-1 rounded-full shadow">
                  AI Generated
                </span>
              )}

              <div className="p-3 space-y-2 text-[#660e60] text-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-base">{activity.name}</h3>
                </div>

                <div className="flex flex-wrap gap-1">
                  {activity.moods?.map((mood) => (
                    <span
                      key={mood._id}
                      className="bg-[#ac6f82] text-white px-2 py-0.5 text-xs rounded-full"
                    >
                      {mood.name}
                    </span>
                  ))}
                </div>

                <p><strong>Suggestion:</strong> {activity.suggestion || 'N/A'}</p>
                <p><strong>Description:</strong> {activity.description || 'N/A'}</p>

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => setEditingId(activity._id)}
                    className="px-3 py-1 text-xs font-semibold rounded bg-[#f3d0a4] text-[#660e60] hover:bg-[#eac897]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(activity._id)}
                    className="px-3 py-1 text-xs font-semibold rounded bg-[#893f71] text-white hover:bg-[#660e60]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingId && (
          <EditActivityModal
            activityId={editingId}
            onClose={() => setEditingId(null)}
            onUpdate={fetchActivities}
          />
        )}
      </div>
    </motion.div>
  );
}

export default ActivityList;
