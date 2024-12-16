// src/components/Dashboard/Dashboard.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./Pages/MainContent";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Fill Sadhana"); // Default menu item
  return (
    <div className="flex h-screen bg-saffron-50">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header />
        <MainContent activeMenu={activeMenu} />
      </div>
    </div>
  );
}

export default Dashboard;
