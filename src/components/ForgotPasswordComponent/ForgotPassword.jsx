import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../Apis';
import { API_ROUTES } from '../../constants/apiRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post(API_ROUTES.FORGOT_PASSWORD, { email });
      toast.success(res.data.msg || 'OTP sent successfully!');

      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FF00CC] to-[#481D39] dark:from-gray-800 dark:to-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md backdrop-blur-[20px] bg-white/10 dark:bg-white/10 border border-white/30 text-white p-8 md:p-10 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-[#FF00CC]">Forgot Password</h2>
        <p className="text-sm text-center mb-6 text-white/70">Enter your email to receive an OTP</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF00CC] mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-[#FF00CC] to-[#481D39] text-white font-semibold py-3 rounded-md transition duration-300 hover:opacity-90 hover:scale-[1.02] ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default ForgotPassword;
