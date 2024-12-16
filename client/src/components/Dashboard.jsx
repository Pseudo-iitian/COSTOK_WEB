import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./Pages/MainContent";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Fill Sadhana");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-saffron-50">
      {/* Sidebar */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />
        <MainContent activeMenu={activeMenu} />
      </div>
    </div>
  );
}

export default Dashboard;
