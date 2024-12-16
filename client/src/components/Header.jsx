import { Bell, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-end h-16 px-4">
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="text-gray-500 hover:text-krishna-blue-900 transition-colors">
            <Bell className="h-6 w-6" />
          </button>

          {/* Settings Icon */}
          <button className="text-gray-500 hover:text-krishna-blue-900 transition-colors">
            <Settings className="h-6 w-6" />
          </button>

          {/* User Profile Placeholder */}
          <div className="w-10 h-10 rounded-full bg-saffron-400 flex items-center justify-center text-krishna-blue-900 font-bold">
            US
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
