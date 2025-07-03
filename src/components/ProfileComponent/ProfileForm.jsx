import { useState, useEffect } from "react";
import API from "../../Apis";
import { useNavigate } from "react-router-dom";
import UploadProfileImage from "./UploadProfileImage";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { API_ROUTES,BASE_URL } from "../../constants/apiRoutes";

function ProfileForm() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    gender: "",
    dob: "",
    location: "",
    contact: "",
    skills: "",
    profileImage: "",
    socialLinks: {
      linkedin: "",
      github: "",
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const navigate = useNavigate();

  const fetchProfile = () => {
    API.get(API_ROUTES.VIEW_PROFILE)
      .then((res) => {
        const { user } = res.data;
        if (user) {
          setFormData({
            bio: user.bio || "",
            gender: user.gender || "",
            dob: user.dob ? user.dob.slice(0, 10) : "",
            location: user.location || "",
            contact: user.contact || "",
            skills: Array.isArray(user.skills) ? user.skills.join(", ") : "",
            profileImage: user.profileImage || "",
            socialLinks: {
              linkedin: user.socialLinks?.linkedin || "",
              github: user.socialLinks?.github || "",
              facebook: user.socialLinks?.facebook || "",
              twitter: user.socialLinks?.twitter || "",
              instagram: user.socialLinks?.instagram || "",
            },
          });
        }
      })
      .catch(() => {
        console.error("No profile found, creating new one.");
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    API.put(API_ROUTES.CREATE_PROFILE, payload)
      .then(() => {
        alert("Profile saved successfully!");
        navigate("/user/profile");
      })
      .catch((err) => {
        alert("Error saving profile");
        console.error(err);
      });
  };

  const personalFields = [
    { name: "bio", label: "Bio" },
    { name: "gender", label: "Gender" },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "location", label: "Location" },
    { name: "contact", label: "Contact" },
    { name: "skills", label: "Skills (comma separated)" },
  ];

  const socialFields = [
    "linkedin",
    "github",
    "facebook",
    "twitter",
    "instagram",
  ];

  return (
    <motion.div
      className="min-h-screen py-10 px-4 sm:px-8 md:px-20 bg-[#fffaf5] dark:bg-[#1f1f1f] text-[#660e60] dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative mb-10">
        {/* Back Button (positioned absolutely to the left) */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#893f71] text-white rounded hover:bg-[#660e60] text-sm transition"
        >
          ← Back to Profile
        </button>

        {/* Centered Heading */}
        <h2 className="text-3xl font-bold text-center text-[#660e60] dark:text-white">
          {formData.bio || formData.gender || formData.location
            ? "Edit Profile"
            : "Create Profile"}
        </h2>
      </div>


      {/* Profile Image Upload */}
      <div className="flex justify-center mb-10">
        <div className="relative">
          <img
            src={
              formData.profileImage
                ? `${BASE_URL}/uploads/${formData.profileImage}`
                : "/default-avatar.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-0 right-0 bg-[#893f71] hover:bg-[#660e60] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            title="Change Image"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {showModal && (
        <UploadProfileImage
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchProfile();
          }}
        />
      )}

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Personal Fields */}
        {personalFields.map((field) => (
          <div key={field.name} className="relative group">
            <input
              type={field.type || "text"}
              name={field.name}
              id={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              placeholder=" "
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent border border-[#ac6f82] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#893f71] peer"
            />
            <label
              htmlFor={field.name}
              className="absolute text-sm text-[#893f71] dark:text-white duration-200 transform scale-75 -translate-y-3 top-2 z-10 origin-[0] left-2 bg-[#fffaf5] dark:bg-[#1f1f1f] px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              {field.label}
            </label>
          </div>
        ))}

        {/* Social Fields */}
        {socialFields.map((key) => (
          <div key={key} className="relative group">
            <input
              type="text"
              name={`socialLinks.${key}`}
              id={`socialLinks.${key}`}
              value={formData.socialLinks[key] || ""}
              onChange={handleChange}
              placeholder=" "
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent border border-[#ac6f82] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#893f71] peer"
            />
            <label
              htmlFor={`socialLinks.${key}`}
              className="absolute text-sm text-[#893f71] dark:text-white duration-200 transform scale-75 -translate-y-3 top-2 z-10 origin-[0] left-2 bg-[#fffaf5] dark:bg-[#1f1f1f] px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          </div>
        ))}

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-[#660e60] hover:bg-[#893f71] text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Save Profile
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default ProfileForm;
