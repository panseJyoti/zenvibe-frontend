import { ClipLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#6366F1" loading={loading} size={60} />
    </div>
  );
};

export default Spinner;
