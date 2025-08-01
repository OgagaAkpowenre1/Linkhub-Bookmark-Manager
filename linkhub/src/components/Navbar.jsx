import logo from "../assets/logo2.png";

function Navbar({ onLogout, email }) {
  const avatarLetter = email?.charAt(0)?.toUpperCase();

  return (
    <div className="w-full flex justify-between items-center px-6 py-2 bg-white shadow-md sticky top-0 z-50">
      <div className="flex flex-shrink-0">
        <img
          src={logo}
          alt="Linkhub logo"
          className="p-0 max-h-12 sm:max-h-14 lg:max-h-16 w-auto"
        />
      </div>

      {email && (
        <div className="flex items-center space-x-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: stringToColor(email) }}
          >
            {avatarLetter}
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

// Utility to generate a consistent background color based on the email
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // simple hash function
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 60%, 50%)`; // pastel-style color
}

export default Navbar;
