import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../Apis';
import {
  Mail, Phone, MapPin,
  Linkedin, Github, Twitter, Instagram, Facebook,
  CalendarDays, UserCircle2, Info
} from 'lucide-react';
import { API_ROUTES,BASE_URL } from '../../constants/apiRoutes';

const UserDetailPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [moodLogs, setMoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const userRes = await API.get(API_ROUTES.ADMIN_USER_DETAIL(userId), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data.user);

        const moodRes = await API.get(API_ROUTES.ADMIN_USER_MOODLOGS(userId), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMoodLogs(moodRes.data.data || []);
      } catch (err) {
        console.error('Error fetching user or mood logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p className="p-6 text-[#ac6f82]">Loading user details...</p>;
  if (!user) return <p className="p-6 text-red-600">User not found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Link to="/admin/dashboard" className="text-sm text-[#893f71] hover:underline">
        ← Back to Dashboard
      </Link>

      {/* USER CARD */}
      <div className="bg-white border-l-4 border-[#660e60] shadow rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start w-full">
        {/* Profile Image */}
        <img
          src={user.profileImage ? `${BASE_URL}/uploads/${user.profileImage}` : '/default-avatar.png'}
          alt="User"
          className="w-36 h-36 object-cover rounded-full border-4 border-[#893f71] shadow"
        />

        {/* User Details Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-[#660e60]">
          {/* Left Column */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#660e60] flex items-center gap-2">
              <UserCircle2 size={22} /> {user.username}
            </h2>
            <p className="flex items-center gap-2"><Mail size={18} className="text-[#893f71]" /> {user.email}</p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-[#ac6f82]" /> 🇮🇳 +91-{user.contact || 'Not Provided'}
            </p>
            <p className="flex items-center gap-2"><MapPin size={18} className="text-[#cfa093]" /> {user.location || 'N/A'}</p>
            <p className="flex items-center gap-2"><CalendarDays size={18} className="text-[#f3d0a4]" /> Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Info size={18} className="text-[#ac6f82]" /> <span className="font-medium">Gender:</span> {user.gender || 'N/A'}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays size={18} className="text-[#cfa093]" /> <span className="font-medium">DOB:</span> {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
            </p>
            <p className="flex items-center gap-2">
              <Info size={18} className="text-[#660e60]" /> <span className="font-medium">Skills:</span> {user.skills?.join(', ') || 'N/A'}
            </p>
            <p className="flex items-start gap-2">
              <Info size={18} className="text-[#893f71] mt-1" /> <span className="font-medium">Bio:</span> <span>{user.bio || 'N/A'}</span>
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-2">
              {user.socialLinks?.linkedin && (
                <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#660e60] hover:text-[#893f71]">
                  <Linkedin size={20} />
                </a>
              )}
              {user.socialLinks?.github && (
                <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-[#660e60] hover:text-[#893f71]">
                  <Github size={20} />
                </a>
              )}
              {user.socialLinks?.twitter && (
                <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-[#660e60] hover:text-[#893f71]">
                  <Twitter size={20} />
                </a>
              )}
              {user.socialLinks?.instagram && (
                <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-[#660e60] hover:text-[#893f71]">
                  <Instagram size={20} />
                </a>
              )}
              {user.socialLinks?.facebook && (
                <a href={user.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-[#660e60] hover:text-[#893f71]">
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* MOOD LOG TABLE */}
      <div className="bg-white border-t-4 border-[#f3d0a4] shadow rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#893f71] mb-4">Mood Log History</h2>

        {moodLogs.length === 0 ? (
          <p className="text-gray-600">No mood logs available for this user.</p>
        ) : (
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto rounded">
            <table className="min-w-full text-left border border-[#cfa093] rounded overflow-hidden">
              <thead className="bg-[#f3d0a4] text-[#660e60] sticky top-0">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Mood</th>
                  <th className="px-4 py-2">Note</th>
                  <th className="px-4 py-2">Suggestions</th>
                </tr>
              </thead>
              <tbody className="text-[#893f71]">
                {moodLogs.map((log) => (
                  <tr key={log._id} className="border-t border-[#f3d0a4] hover:bg-[#fffaf5] transition">
                    <td className="px-4 py-3">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3 font-semibold">{log.mood?.name || 'Unknown'}</td>
                    <td className="px-4 py-3">{log.note || '—'}</td>
                    <td className="px-4 py-3">
                      {log.suggestions.length === 0 ? (
                        <span className="text-sm text-gray-500">No suggestions</span>
                      ) : (
                        <ul className="space-y-1">
                          {log.suggestions.map((sug, idx) => (
                            <li key={idx} className="text-sm">
                              <strong>{sug.name}:</strong> {sug.suggestion}
                              {/* {sug.image && (
                                <img
                                  src={sug.image}
                                  alt={sug.name}
                                  className="w-24 h-16 object-cover mt-1 rounded"
                                  onError={(e) => (e.target.style.display = 'none')}
                                />
                              )} */}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default UserDetailPage;
