import PropTypes from "prop-types";
import Attendance from "./Attendance";
import Books from "./Books";
import DailyLectures from "./DailyLectures";
import FillSadhana from "./FillSadhana";
import MarkingScheme from "./MarkingScheme";
import Leaderboard from "./Leaderboard";
import MySadhana from "./MySadhna";

const MainContent = ({ activeMenu }) => {
  const renderContent = () => {
    switch (activeMenu) {
      case "Attendance":
        return <Attendance />;
      case "Books":
        return <Books />;
      case "Daily Lectures":
        return <DailyLectures />;
      case "Fill Sadhana":
        return <FillSadhana />;
      case "Marking Scheme":
        return <MarkingScheme />;
      case "Leaderboard":
        return <Leaderboard />;
      case "My Sadhana":
        return <MySadhana />;
      default:
        return <p>coming soon...</p>;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="mt-4 text-gray-600">{renderContent()}</div>
    </main>
  );
};

MainContent.propTypes = {
  activeMenu: PropTypes.string.isRequired,
};

export default MainContent;
