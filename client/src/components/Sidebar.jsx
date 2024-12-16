import PropTypes from "prop-types"; // Import PropTypes
import {
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  Award,
  User,
  MessageSquare,
} from "lucide-react";

const menuItems = [
  { name: "Fill Sadhana", icon: CheckSquare },
  { name: "Marking Scheme", icon: FileText },
  { name: "Attendance", icon: Calendar },
  { name: "Daily Lectures", icon: MessageSquare },
  { name: "Books", icon: BookOpen },
  { name: "Leaderboard", icon: Award },
  { name: "My Sadhana", icon: User },
];

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  return (
    <div className="w-64 bg-krishna-blue-900 text-white h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-saffron-400">ISKCON BACE</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveMenu(item.name)} // Set active menu on click
            className={`flex items-center px-4 py-2 text-saffron-100 hover:bg-krishna-blue-800 transition-colors ${
              activeMenu === item.name ? "bg-krishna-blue-700" : ""
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// Define PropTypes for Sidebar
Sidebar.propTypes = {
  activeMenu: PropTypes.string.isRequired,
  setActiveMenu: PropTypes.func.isRequired,
};

export default Sidebar;
