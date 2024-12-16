import { Bell, Settings, Menu } from "lucide-react";
import PropTypes from "prop-types";

const Header = ({ toggleSidebar, isMobile }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between h-16 px-4">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-krishna-blue-900 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-krishna-blue-900 transition-colors">
            <Bell className="h-6 w-6" />
          </button>
          <button className="text-gray-500 hover:text-krishna-blue-900 transition-colors">
            <Settings className="h-6 w-6" />
          </button>
          <div className="w-10 h-10 rounded-full bg-saffron-400 flex items-center justify-center text-krishna-blue-900 font-bold">
            US
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Header;
