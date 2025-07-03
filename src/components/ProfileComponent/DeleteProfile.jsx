import API from "../../Apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ROUTES } from "../../constants/apiRoutes";

function DeleteProfileButton({ className = "" }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (!confirmDelete) return;

    try {
      const res = await API.delete(API_ROUTES.DELETE_PROFILE);
      toast.success(res.data.msg || "Profile deleted successfully");
      navigate("/user/profile");
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm ${className}`}
    >
      Delete Profile
    </button>
  );
}

export default DeleteProfileButton;
