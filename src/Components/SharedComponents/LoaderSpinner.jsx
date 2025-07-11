
import { ClipLoader } from "react-spinners";

const LoaderSpinner = ({ size = 50, color = '#3b82f6', loading = true }) => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <ClipLoader size={size} color={color} loading={loading} />
    </div>
  );
};

export default LoaderSpinner;