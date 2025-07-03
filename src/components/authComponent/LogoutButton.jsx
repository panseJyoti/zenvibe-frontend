import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ icon, label }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Firebase logout failed or user not logged in:", err.message);
    }

    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 text-white hover:text-red-400 text-sm px-3 py-2"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default LogoutButton;
