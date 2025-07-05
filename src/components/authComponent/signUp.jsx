import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../Apis';
import { API_ROUTES } from '../../constants/apiRoutes';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // ✅ Prevent multiple popups
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (!isValidEmail(formData.email)) {
      return setMsg({ type: 'error', text: 'Please enter a valid email address.' });
    }

    if (formData.password.length < 6) {
      return setMsg({ type: 'error', text: 'Password must be at least 6 characters long.' });
    }

    setLoading(true);

    try {
      const res = await API.post(API_ROUTES.REGISTER, formData);
      setMsg({ type: 'success', text: res.data.msg });

      setTimeout(() => {
        navigate('/sign-in');
      }, 1500);
    } catch (err) {
      setMsg({
        type: 'error',
        text: err.response?.data?.msg || 'Signup failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const googleUserData = {
        email: user.email,
        username: user.displayName || 'Google User',
        password: user.uid,
        isGoogle: true,
      };
      console.log("google user data.....:",googleUserData);
      const res = await API.post(API_ROUTES.REGISTER, googleUserData);
      const { token, user: userData, msg } = res.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        setMsg({ type: 'success', text: msg || 'Google signup successful!' });

        setTimeout(() => {
          navigate('/user/dashboard');
        }, 1000);
      } else {
        setMsg({ type: 'error', text: 'Token missing from server response.' });
      }
    } catch (err) {
      console.error('Google Signup Error:', err);
      setMsg({
        type: 'error',
        text:
          err.code === 'auth/cancelled-popup-request'
            ? 'Please wait... popup already open!'
            : err.message || 'Google signup failed. Please try again.',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FF00CC] to-[#481D39] dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md backdrop-blur-[20px] bg-white/10 dark:bg-white/10 border border-white/30 text-white p-8 md:p-10 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create your <span className="text-[#FF00CC]">ZenVibe</span> Account
        </h2>

        {msg.text && (
          <div
            className={`mb-4 p-3 rounded text-sm text-center ${
              msg.type === 'error'
                ? 'bg-red-200/30 text-red-200'
                : 'bg-green-200/30 text-green-200'
            }`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF00CC]"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF00CC]"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF00CC]"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF00CC] to-[#481D39] text-white font-semibold py-3 rounded-md transition duration-200 hover:opacity-90 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="text-gray-200 text-sm">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full border border-gray-300 dark:border-gray-600 py-2 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm hover:text-black text-gray-200">
            Sign up with Google
          </span>
        </button>

        <p className="text-sm text-center mt-6 text-white/80">
          Already have an account?{' '}
          <Link
            to="/sign-in"
            className="text-pink-400 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
