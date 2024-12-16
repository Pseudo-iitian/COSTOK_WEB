import PropTypes from "prop-types";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  Award,
  User,
  MessageSquare,
  X,
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

const Sidebar = ({
  activeMenu,
  setActiveMenu,
  isMobile,
  isOpen,
  toggleSidebar,
}) => {
  const sidebarClasses = `
    ${
      isMobile
        ? "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out"
        : "w-64"
    }
    ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
    bg-krishna-blue-900 text-white h-full
  `;

  return (
    <div className={sidebarClasses}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-saffron-400">ISKCON BACE</h1>
        {isMobile && (
          <button onClick={toggleSidebar} className="text-white">
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActiveMenu(item.name);
              if (isMobile) toggleSidebar();
            }}
            className={`flex items-center px-4 py-2 text-saffron-100 hover:bg-krishna-blue-800 transition-colors w-full ${
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

Sidebar.propTypes = {
  activeMenu: PropTypes.string.isRequired,
  setActiveMenu: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
