import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../Apis';
import { API_ROUTES } from '../../constants/apiRoutes';
import { ImagePlus } from 'lucide-react';

function ActivityForm() {
  const [name, setName] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [description, setDescription] = useState('');
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await API.get(API_ROUTES.MOOD_LIST);
        setMoods(res.data.moods || []);
      } catch (err) {
        toast.error('Failed to load moods');
      }
    };
    fetchMoods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('suggestion', suggestion);
    formData.append('description', description);
    formData.append('moods', JSON.stringify(selectedMoods));
    if (image) formData.append('image', image);

    try {
      const res = await API.post(API_ROUTES.ADD_ACTIVITY, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(res.data.msg || 'Activity created successfully!');
      setName('');
      setSuggestion('');
      setDescription('');
      setSelectedMoods([]);
      setImage(null);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Activity creation failed');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#fffaf5] dark:bg-gray-900">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => navigate('/admin/activities/view')}
          className="bg-gradient-to-r from-[#660e60] to-[#893f71] text-white px-5 py-2 shadow-md hover:scale-105 transition duration-300 text-sm"
        >
          View Activities
        </button>
      </div>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-[#ac6f82]">

        {/* Heading & Button Row */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#660e60] dark:text-white">Create Activity</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Activity Name */}
          <div className="relative group text-sm">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
              className="block px-2 pb-2 pt-4 w-full text-sm bg-transparent border border-[#ac6f82] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#893f71] peer dark:bg-gray-700 dark:text-white"
            />
            <label
              className="absolute text-sm text-[#893f71] dark:text-white duration-200 transform scale-75 -translate-y-3 top-2 z-10 origin-[0] left-2 bg-[#ffffff] dark:bg-gray-800 px-1 
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:top-4 
              peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Activity Name
            </label>
          </div>

          {/* Suggestion */}
          <div className="relative group text-sm">
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder=" "
              rows="2"
              className="block px-2 pb-2 pt-4 w-full text-sm resize-none bg-transparent border border-[#ac6f82] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#893f71] peer dark:bg-gray-700 dark:text-white"
            />
            <label
              className="absolute text-sm text-[#893f71] dark:text-white duration-200 transform scale-75 -translate-y-3 top-2 z-10 origin-[0] left-2 bg-[#ffffff] dark:bg-gray-800 px-1 
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:top-4 
              peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Suggestion
            </label>
          </div>

          {/* Description */}
          <div className="relative group text-sm">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              rows="3"
              className="block px-2 pb-2 pt-4 w-full text-sm resize-none bg-transparent border border-[#ac6f82] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#893f71] peer dark:bg-gray-700 dark:text-white"
            />
            <label
              className="absolute text-sm text-[#893f71] dark:text-white duration-200 transform scale-75 -translate-y-3 top-2 z-10 origin-[0] left-2 bg-[#ffffff] dark:bg-gray-800 px-1 
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:top-4 
              peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Description
            </label>
          </div>

          {/* Mood Select Dropdown */}
          <div className="relative">
            <label className="block text-[#660e60] dark:text-white font-medium mb-2 text-sm">
              Select Moods:
            </label>
            <div className="relative h-36 overflow-y-auto border border-[#ac6f82] rounded-lg dark:bg-gray-700 dark:text-white bg-white custom-scrollbar px-3 py-2 text-sm">
              {moods.length === 0 ? (
                <p className="text-gray-500 text-sm">No moods available</p>
              ) : (
                moods.map((mood) => (
                  <label key={mood._id} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input
                      type="checkbox"
                      value={mood._id}
                      checked={selectedMoods.includes(mood._id)}
                      onChange={(e) => {
                        const moodId = e.target.value;
                        setSelectedMoods((prev) =>
                          prev.includes(moodId)
                            ? prev.filter((id) => id !== moodId)
                            : [...prev, moodId]
                        );
                      }}
                      className="accent-[#893f71] w-4 h-4"
                    />
                    <span>{mood.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[#660e60] dark:text-white font-medium mb-2 text-sm">
              Upload Image:
            </label>
            <div className="flex items-center gap-3 border border-[#ac6f82] rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
              <ImagePlus className="text-[#893f71] dark:text-white w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-sm text-gray-700 dark:text-white bg-transparent focus:outline-none"
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#660e60] text-white py-2 px-4 rounded-lg hover:bg-[#893f71] transition duration-300 text-sm"
          >
            Create Activity
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActivityForm;
