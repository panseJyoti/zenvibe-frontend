import { useEffect, useState } from 'react';
import API from '../../Apis';
import { toast } from 'react-toastify';
import { FaFileUpload } from 'react-icons/fa';
import { API_ROUTES } from '../../constants/apiRoutes';

const EditActivityModal = ({ activityId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    suggestion: '',
    description: '',
    moods: [],
    image: '',
  });
  const [allMoods, setAllMoods] = useState([]);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activityRes, moodsRes] = await Promise.all([
          API.get(API_ROUTES.GET_ACTIVITY_BY_ID(activityId)),
          API.get(API_ROUTES.MOOD_LIST),
        ]);
        const { name, suggestion, description, moods, image } = activityRes.data.activity;
        setFormData({
          name,
          suggestion,
          description,
          moods: moods.map((m) => m._id),
          image,
        });
        setAllMoods(moodsRes.data.moods);
      } catch {
        toast.error('Failed to load activity');
        onClose();
      }
    };
    if (activityId) fetchData();
  }, [activityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMoodChange = (moodId) => {
    setFormData((prev) => ({
      ...prev,
      moods: prev.moods.includes(moodId)
        ? prev.moods.filter((id) => id !== moodId)
        : [...prev.moods, moodId],
    }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('suggestion', formData.suggestion);
    form.append('description', formData.description);
    form.append('moods', JSON.stringify(formData.moods));
    if (newImage) form.append('image', newImage);

    try {
      await API.put(API_ROUTES.UPDATE_ACTIVITY(activityId), form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Activity updated!');
      onUpdate();
      onClose();
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-[#fffaf5] dark:bg-gray-900 w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
        
        {/* Header Nav-Like Bar */}
        <div className="flex justify-between items-center bg-[#660e60] text-white px-6 py-4">
          <h2 className="text-lg md:text-xl font-semibold">Edit Activity</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-[#f3d0a4]"
          >
            &times;
          </button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#660e60] mb-1">Activity Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#ac6f82] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#893f71]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#660e60] mb-1">Suggestion</label>
              <input
                type="text"
                name="suggestion"
                value={formData.suggestion}
                onChange={handleChange}
                className="w-full border border-[#ac6f82] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#893f71]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#660e60] mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-[#ac6f82] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#893f71]"
            />
          </div>

          <div>
            <p className="font-semibold text-[#660e60] mb-2">Select Moods</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allMoods.map((mood) => (
                <label key={mood._id} className="flex items-center gap-2 text-sm text-[#893f71]">
                  <input
                    type="checkbox"
                    checked={formData.moods.includes(mood._id)}
                    onChange={() => handleMoodChange(mood._id)}
                    className="accent-[#ac6f82]"
                  />
                  {mood.name}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="w-full">
              <label
                htmlFor="fileUpload"
                className="flex items-center gap-3 border border-[#ac6f82] text-[#660e60] rounded-lg px-4 py-2 cursor-pointer hover:bg-[#f3d0a4] transition"
              >
                <FaFileUpload className="text-[#893f71]" />
                <span>{newImage ? newImage.name : 'Choose Image'}</span>
              </label>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e);
                  setNewImage(e.target.files[0]);
                }}
                className="hidden"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
             {/* Action Buttons */}
            <button
              type="submit"
              className="bg-[#660e60] hover:bg-[#893f71] text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Update Activity
            </button>
          </div>
          </div> 
        </form>
      </div>
    </div>
  );
};

export default EditActivityModal;
