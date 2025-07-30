import { ClipLoader } from "react-spinners";

function Loader({ loading, size = 35 }) {
  return (
    loading && (
      <div className="flex justify-center items-center py-4">
        <ClipLoader color="#6366f1" loading={loading} size={size} />
      </div>
    )
  );
}

export default Loader;
