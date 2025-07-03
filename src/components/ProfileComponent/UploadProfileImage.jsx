import { useState } from 'react';
import API from '../../Apis';
import { X, Camera } from 'lucide-react';
import { API_ROUTES } from '../../constants/apiRoutes';

function UploadProfileModal({ onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreview(previewURL);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('profileImage', file);
    setLoading(true);
    try {
      await API.put(API_ROUTES.UPLOAD_PROFILE_IMAGE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-br from-[#fffaf5] to-[#f3d0a4] dark:from-[#2a2a2a] dark:to-[#1f1f1f] rounded-2xl p-6 shadow-2xl w-96 relative animate-fade-in border-2 border-[#ac6f82]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#660e60] dark:text-white hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#660e60] dark:text-[#f3d0a4] mb-6">
          Upload Profile Image
        </h2>

        {/* Preview */}
        <div className="flex justify-center mb-4">
          <div className="relative w-28 h-28">
            <img
              src={preview || "/default-avatar.png"}
              alt="Preview"
              className="w-28 h-28 rounded-full object-cover shadow-md ring-4 ring-[#ac6f82] transition duration-300 hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#ac6f82] hover:bg-[#893f71] text-white rounded-full p-2 shadow-md cursor-pointer transition">
              <label htmlFor="uploadInput" className="cursor-pointer">
                <Camera size={18} />
              </label>
            </div>
          </div>
        </div>

        {/* File Input */}
        <input
          type="file"
          id="uploadInput"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full mt-4 py-2 text-white font-semibold rounded-full shadow-lg transition duration-300
            ${loading ? "bg-[#ac6f82] cursor-not-allowed" : "bg-[#660e60] hover:bg-[#893f71]"}`}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
}

export default UploadProfileModal;
