import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../Apis';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_ROUTES } from '../../constants/apiRoutes';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('resetToken');
    if (!storedToken) {
      toast.error('Reset token missing! Please verify OTP again.');
    } else {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('Token missing! Please verify OTP again.');
      return;
    }

    if (newPassword.length <= 6) {
      toast.error('Password must be more than 6 characters.');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(API_ROUTES.RESET_PASSWORD,{ newPassword }, { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.msg || 'Password reset successful!');
      sessionStorage.removeItem('resetToken');
      setNewPassword('');

      setTimeout(() => {
        navigate('/sign-in');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Password reset mein problem aayi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FF00CC] to-[#481D39] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-[20px] border border-white/30 rounded-2xl shadow-2xl p-8 md:p-10 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-[#FF00CC]">
          Reset Password
        </h2>
        <p className="text-sm text-center mb-6 text-white/70">
          Enter your new password below
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-3 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF00CC]"
        />

        <button
          type="submit"
          disabled={loading || !token}
          className={`w-full py-3 font-semibold rounded-md bg-gradient-to-r from-[#FF00CC] to-[#481D39] transition duration-300 transform hover:scale-105 hover:shadow-xl ${
            loading || !token ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default ResetPassword;
