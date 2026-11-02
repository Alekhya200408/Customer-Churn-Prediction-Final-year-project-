
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      {sidebarOpen && <Sidebar />}

      <div className="flex-1 min-w-0">

        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Main Content */}
        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;
