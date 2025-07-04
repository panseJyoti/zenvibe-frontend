import { useEffect, useState } from 'react';
import API from '../../Apis';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { API_ROUTES } from '../../constants/apiRoutes';

const MoodLogger = () => {
  const [mode, setMode] = useState('manual');
  const [moodId, setMoodId] = useState('');
  const [moodText, setMoodText] = useState('');
  const [note, setNote] = useState('');
  const [moods, setMoods] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
  const userName = localStorage.getItem('username') || 'Friend';

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await API.get(API_ROUTES.GET_USER_MOODS);
        console.log("response data :", res.data);
        setMoods(res.data?.moods || res.data || []);
      } catch (err) {
        console.error('Failed to load moods:', err);
      }
    };
    fetchMoods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      let res;

      if (mode === 'manual') {
        res = await API.post(API_ROUTES.POST_MOOD_LOG, { moodId, note });

        // 🔁 If manual mood has no suggestions, switch to AI
        if (res.data?.redirectToAI) {
          console.log('Switching to AI mode...');
          setMode('ai');
          setMoodText(res.data.moodName || '');
          setMessage(res.data.message || 'No suggestions found. Switching to AI mode...');
          setLoading(false);
          return;
        }
      } else {
        res = await API.post(API_ROUTES.AI_SUGGEST_ACTIVITY, { mood: moodText, note });
      }

      // ✅ Show suggestions
      setSuggestions(res.data.suggestions ? res.data.suggestions : [res.data.suggestion]);
      setMessage(res.data.message || 'Suggestion received!');
      setMoodId('');
      setMoodText('');
      setNote('');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen px-4 py-10 ${theme === 'dark' ? 'bg-[#1f1f1f] text-white' : 'bg-[#fcf9f4] text-[#660e60]'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">Welcome Back, {userName}!</h2>
          <p className="text-md mt-2">How are you feeling today? Log your mood below.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-[#292929]' : 'bg-white'}`}
          >
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setMode('manual')}
                className={`px-4 py-2 rounded-lg font-semibold border ${mode === 'manual' ? 'bg-[#660e60] text-white' : 'bg-white text-[#660e60] border-[#660e60]'}`}
              >
                Manual Mode
              </button>
              <button
                onClick={() => setMode('ai')}
                className={`px-4 py-2 rounded-lg font-semibold border ${mode === 'ai' ? 'bg-[#660e60] text-white' : 'bg-white text-[#660e60] border-[#660e60]'}`}
              >
                AI Mode
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'manual' ? (
                <div>
                  <label className="block mb-1 text-sm font-medium">Select Mood</label>
                  <select
                    value={moodId}
                    onChange={(e) => setMoodId(e.target.value)}
                    className="w-full rounded-lg border border-[#ac6f82] bg-[#f3d0a4] text-[#660e60] px-4 py-2"
                    required
                  >
                    <option value="">-- Choose a mood --</option>
                    {moods.map((mood) => (
                      <option key={mood._id} value={mood._id}>
                        {mood.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block mb-1 text-sm font-medium">Type Your Mood</label>
                  <input
                    type="text"
                    value={moodText}
                    onChange={(e) => setMoodText(e.target.value)}
                    placeholder="e.g. Anxious, Excited, Lonely..."
                    className="w-full rounded-lg border border-[#ac6f82] bg-[#f3d0a4] text-[#660e60] px-4 py-2"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block mb-1 text-sm font-medium">Note (Optional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows="4"
                  className="w-full rounded-lg border border-[#ac6f82] bg-[#f3d0a4] text-[#660e60] px-4 py-2"
                  placeholder="Write a note if you like..."
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 bg-[#660e60] hover:bg-[#893f71] text-white font-semibold rounded-lg transition"
                disabled={loading}
              >
                {loading ? 'Processing...' : mode === 'manual' ? 'Log Mood' : 'Get AI Suggestion'}
              </motion.button>

              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-green-600 font-medium"
                >
                  {message}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Suggestion Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-6 rounded-2xl shadow-xl h-full flex flex-col gap-4 overflow-auto max-h-[600px] ${theme === 'dark' ? 'bg-[#292929]' : 'bg-white'}`}>
              <h3 className="text-2xl font-semibold text-[#893f71] mb-4">Suggested Activities</h3>

              {suggestions.length > 0 ? (
                <div className="grid gap-4">
                  {suggestions.map((activity, i) => (
                    <div
                      key={i}
                      className="p-4 bg-[#ac6f82] text-white rounded-lg shadow hover:shadow-lg transition"
                    >
                      <h4 className="text-lg font-bold">{activity.name || activity.suggestion}</h4>
                      <p className="text-sm mt-1">{activity.description}</p>
                      {activity.image && (
                        <img
                          src={`https://zenvibe-backend.onrender.com/uploads/${activity.image}`}
                          alt={activity.name}
                          className="mt-3 w-full aspect-video object-cover rounded-md"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                !loading && (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-300">
                    No suggestions yet. Try logging your mood!
                  </p>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MoodLogger;
