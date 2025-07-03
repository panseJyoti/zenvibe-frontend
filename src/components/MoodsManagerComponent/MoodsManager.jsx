import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify'; 
import API from '../../Apis';
import { API_ROUTES } from '../../constants/apiRoutes';

export default function MoodsManager() {
  const [moods, setMoods] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const fetchMoods = async () => {
    try {
      const res = await API.get(API_ROUTES.MOOD_LIST);
      const moodList = Array.isArray(res.data) ? res.data : res?.data?.moods || [];
      setMoods(moodList);
    } catch (err) {
      toast.error('Failed to load moods');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleCreateMood = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Mood name is required');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(API_ROUTES.MOOD_ADD, { name, description });
      toast.success(res.data.msg || 'Mood created');
      setName('');
      setDescription('');
      await fetchMoods();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error creating mood');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMood = async (id) => {
    if (!window.confirm('Are you sure you want to delete this mood?')) return;

    try {
      setLoading(true);
      await API.delete(API_ROUTES.MOOD_DELETE(id));
      toast.success('Mood deleted successfully');
      await fetchMoods();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error deleting mood');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen p-6 bg-[#fdf6ec] dark:bg-gray-900"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center text-[#660e60] dark:text-white">
          Mood Manager
        </h1>

        {/* Create Form */}
        <motion.form
          onSubmit={handleCreateMood}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-[#ac6f82] shadow-md space-y-5"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-[#893f71] dark:text-[#f3d0a4]">
            Create New Mood
          </h2>

          <div>
            <label className="block font-medium text-[#660e60] dark:text-white">
              Mood Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter mood name"
              className="mt-2 w-full rounded-lg border border-[#893f71] px-4 py-2 focus:ring-2 focus:ring-[#ac6f82] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium text-[#660e60] dark:text-white">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional mood description"
              className="mt-2 w-full rounded-lg border border-[#893f71] px-4 py-2 focus:ring-2 focus:ring-[#ac6f82] dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#660e60] text-white px-6 py-2 rounded-lg hover:bg-[#893f71] transition-all duration-300"
          >
            {loading ? 'Creating...' : 'Create Mood'}
          </button>
        </motion.form>

        {/* Mood Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-[#ac6f82] shadow-md overflow-x-auto">
          <h2 className="text-2xl font-semibold text-[#660e60] dark:text-[#f3d0a4] mb-4">
            All Moods
          </h2>

          {loading ? (
            <p className="text-[#893f71]">Loading moods...</p>
          ) : moods.length === 0 ? (
            <p className="text-[#893f71]">No moods found.</p>
          ) : (
            <table className="w-full text-left">
              <thead className="text-[#893f71] text-sm uppercase border-b border-[#893f71]">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {moods.map((mood) => (
                  <motion.tr
                    key={mood._id}
                    whileHover={{ scale: 1.01 }}
                    className="transition bg-[#fdf6ec] dark:bg-gray-700 border-b border-[#cfa093]"
                  >
                    <td className="p-3 font-semibold text-[#660e60] dark:text-white">
                      {capitalize(mood.name)}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {mood.description || '--'}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteMood(mood._id)}
                        className="text-red-600 hover:text-red-800 font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </motion.div>
  );
}
