// components/FullscreenLoader.jsx
import { ClipLoader } from "react-spinners";

export default function FullscreenLoader({ loading }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <ClipLoader color="#fff" size={50} />
    </div>
  );
}
