import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../Apis';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_ROUTES } from '../../constants/apiRoutes';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post(API_ROUTES.VERIFY_OTP, { email, otp });
      sessionStorage.setItem('resetToken', res.data.resetToken);
      toast.success('OTP verified! Redirecting...');
      setTimeout(() => navigate('/reset-password'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'OTP verify karne mein problem aayi.');
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
        <h2 className="text-2xl font-bold text-center mb-4 text-[#FF00CC]">Verify OTP</h2>
        <p className="text-sm text-center mb-6 text-white/70">Enter your email and OTP to continue</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF00CC] mb-4"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
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
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default VerifyOtp;
