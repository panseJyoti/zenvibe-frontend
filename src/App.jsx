import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';

// Common Components
import Profile from './components/ProfileComponent/UserProfile';
import ProfileForm from './components/ProfileComponent/ProfileForm';
import ForgotPassword from './components/ForgotPasswordComponent/ForgotPassword';
import ResetPassword from './components/ForgotPasswordComponent/ResetPassword';
import VerifyOtp from './components/ForgotPasswordComponent/VerifyOtp';
import VerifyEmail from './components/authComponent/VerifyEmail';

// Auth & Public Pages
import Home from './components/HomeComponent/Home';
import Login from './components/authComponent/Login';
import Signup from './components/authComponent/signUp';

// User Pages
import UserDashboard from './components/UserDashboardComponent/UserDashboard';
import MoodLogger from './components/MoodLogComponent/MoodLogger';
import MoodHistory from './components/MoodLogComponent/MoodHistory';
import Suggestions from './components/SuggestionComponent/Suggestion';
import MoodAnalyticsChart from './components/MoodLogComponent/MoodAnalytics';

// Admin Pages
import AdminDashboard from './components/AdminDashboardComponent/AdminDashboard';
import MoodsManager from './components/MoodsManagerComponent/MoodsManager';
import ActivitiesManager from './components/ActivitiesManagerComponent/CreateActivity';
import ViewActivities from './components/ActivitiesManagerComponent/ActivitiesList';
import UserDetailPage from './components/AdminDashboardComponent/UserDetailPage';
import ActivityList from './components/ActivitiesManagerComponent/ActivitiesList';

function App() {
  return (
    <>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ✅ User Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit-profile" element={<ProfileForm />} />
          <Route path="moodlog" element={<MoodLogger />} />
          <Route path="moodhistory" element={<MoodHistory />} />
          <Route path="suggestion" element={<Suggestions />} />
          <Route path="analytics" element={<MoodAnalyticsChart />} />
        </Route>

        {/* ✅ Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit-profile" element={<ProfileForm />} />
          <Route path="moods" element={<MoodsManager />} />
          <Route path="activities" element={<ActivitiesManager />} />
          <Route path="activityList" element={<ActivityList />} />
          <Route path="activities/view" element={<ViewActivities />} />
          <Route path="users/:userId" element={<UserDetailPage />} /> 
        </Route>
      </Routes>

      {/* ✅ Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
