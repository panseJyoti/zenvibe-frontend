import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../Apis';
import { API_ROUTES } from '../../constants/apiRoutes';
import Spinner from '../../components/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await API.post(API_ROUTES.LOGIN, formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMsg({ type: 'success', text: res.data.msg });

      setTimeout(() => {
        if (user.role?.toLowerCase() === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }, 1000);
    } catch (err) {
      setMsg({
        type: 'error',
        text: err.response?.data?.msg || 'Login failed',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner loading={true} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FF00CC] to-[#481D39] dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md backdrop-blur-[20px] bg-white/10 dark:bg-white/10 border border-white/30 text-white p-8 md:p-10 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to <span className="text-[#FF00CC]">ZenVibe</span>
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

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-pink-300 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF00CC] to-[#481D39] text-white font-semibold py-3 rounded-md transition duration-200 hover:opacity-90 disabled:opacity-50"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-white/80">
          Don&apos;t have an account?{' '}
          <Link
            to="/sign-up"
            className="text-pink-400 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
