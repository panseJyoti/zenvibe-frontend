import { useEffect, useState } from 'react';
import API from '../../Apis';
import UploadProfileImage from './UploadProfileImage';
import DeleteProfileButton from './DeleteProfile';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import MoodCalendar from '../MoodLogComponent/MoodCalendar';
import { API_ROUTES,BASE_URL } from '../../constants/apiRoutes';

const toCamelCase = (str) =>
  str?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    API.get(API_ROUTES.VIEW_PROFILE)
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        const message = err.response?.data?.message || 'Failed to load profile';
        setError(message);
        toast.error(message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner loading={loading} />;
  if (error) return <div className="text-center text-red-600 mt-6">{error}</div>;
  if (!user) return <div className="text-center text-gray-600 mt-6">Loading profile...</div>;

  const { socialLinks = {} } = user;

  return (
    <div className={`min-h-screen overflow-x-hidden ${theme === 'dark' ? 'bg-[#1f1f1f] text-white' : 'bg-[#fcf9f4] text-[#660e60]'}`}>
      {/* Banner */}
      <div className="relative h-60 w-full">
        <img
          src="/images/banner1.jpg"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-20 left-6 sm:left-10 flex items-center gap-6 z-10 w-full pr-10 justify-between">
          <div className="flex items-center gap-6">
            <img
              src={user.profileImage ? `https://zenvibe-backend.onrender.com/uploads/${user.profileImage}?${Date.now()}` : "/default-avatar.png"}
              alt="Profile"
              className="w-36 h-36 border-4 border-white object-cover shadow-xl"
            />
            <div>
              <h2 className="text-3xl font-bold text-[#893f71] dark:text-[#f3d0a4]">{toCamelCase(user.username)}</h2>
              <p className="text-[#660e60] dark:text-[#f3d0a4]">{user.email}</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-sm text-blue-600 dark:text-blue-300 underline mt-1"
              >
                Change your Image
              </button>
            </div>
          </div>

          {/* Social Links inline beside username */}
          <div className="flex flex-wrap justify-start gap-4 mt-6 items-center max-w-full">
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="text-[#E1306C] hover:scale-110 transition-transform"
              >
                <Linkedin size={28} />
              </a>
            )}
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className="text-[#E1306C] dark:text-white hover:scale-110 transition-transform"
              >
                <Github size={28} />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                title="Twitter"
                className="text-[#E1306C] hover:scale-110 transition-transform"
              >
                <Twitter size={28} />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="text-[#E1306C] hover:scale-110 transition-transform"
              >
                <Instagram size={28} />
              </a>
            )}
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                className="text-[#E1306C] hover:scale-110 transition-transform"
              >
                <Facebook size={28} />
              </a>
            )}
          </div>

        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <UploadProfileImage
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            toast.success("Profile image updated");
            API.get(API_ROUTES.VIEW_PROFILE)
              .then((res) => setUser(res.data.user))
              .catch(() => toast.error("Failed to reload profile"));
          }}
        />
      )}

      {/* Content */}
      <div className="px-6 pt-28 pb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-[#f3d0a4] pb-4">
            <h3 className="text-xl font-bold text-[#481D39] dark:text-[#f3d0a4]">Profile Information</h3>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('edit-profile')}
                className="px-4 py-1.5 bg-[#660e60] text-white rounded-md hover:bg-[#893f71] text-sm transition"
              >
                Edit Profile
              </button>
              <DeleteProfileButton className="px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm transition" />
            </div>
          </div>


          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Name", value: toCamelCase(user.username) },
              { label: "Email", value: user.email },
              { label: "Date of Birth", value: user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A' },
              { label: "Gender", value: toCamelCase(user.gender) },
              {
                label: "Contact",
                value: user.contact ? `+91 ${user.contact.slice(0, 5)}-${user.contact.slice(5)}` : 'N/A'
              },
              { label: "Address", value: toCamelCase(user.location) || 'N/A' },
              { label: "Bio", value: toCamelCase(user.bio) || 'N/A' },
              {
                label: "Skills",
                value: user.skills?.length
                  ? user.skills.map(toCamelCase).join(', ')
                  : 'No skills added',
              }
            ].map((item, index) => (
              <div
                key={index}
                className={` dark:bg-[#333333] border border-[#ac6f82] rounded-xl shadow p-5 transition-transform hover:scale-[1.02]`}
              >
                <p className="text-sm font-bold text-[#893f71] uppercase tracking-wide mb-1">{item.label}</p>
                <p className="text-base font-medium text-[#660e60] dark:text-white break-words">{item.value}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Right Content (Calendar) */}
        <div>
          <MoodCalendar />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
