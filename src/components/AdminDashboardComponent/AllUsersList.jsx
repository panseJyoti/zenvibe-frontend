import { useEffect, useState } from 'react';
import API from '../../Apis';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone, Mail, User } from 'lucide-react';
import { API_ROUTES,BASE_URL } from '../../constants/apiRoutes';

const AllUsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(API_ROUTES.ALL_USERS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-[#660e60] mb-6">All Registered Users</h2>

      <div className="space-y-4">
        {users.map((user) => (
          <Link
            to={`/admin/users/${user._id}`}
            key={user._id}
            className="flex items-center gap-6 bg-white border border-[#ac6f82] hover:bg-[#f3d0a4]/20 transition rounded-xl p-4 shadow-md"
          >
            {/* Profile Image */}
            <img
               src={user.profileImage ? `${BASE_URL}/uploads/${user.profileImage}` : '/default-avatar.png'}
              alt={user.username}
              className="w-16 h-16 object-cover rounded-full border-2 border-[#893f71]"
              onError={(e) => (e.target.style.display = 'none')}
            />

            {/* User Info */}
            <div className="flex-1 text-[#893f71]">
              <p className="text-xl font-semibold flex items-center gap-2">
                <User size={18} /> {user.username}
                {user.verified && (
                  <span className="text-green-600 text-sm flex items-center gap-1 ml-2">
                    <CheckCircle size={16} /> Verified
                  </span>
                )}
              </p>
              <p className="flex items-center gap-2 text-sm text-[#660e60]">
                <Mail size={16} /> {user.email}
              </p>
              <p className="flex items-center gap-2 text-sm text-[#660e60]">
                <Phone size={16} /> +91-{user.contact || 'N/A'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllUsersList;
