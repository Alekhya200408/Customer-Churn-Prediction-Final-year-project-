import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BrainCircuit,
  History,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "New Prediction",
      path: "/prediction",
      icon: BrainCircuit,
    },
    {
      name: "Prediction History",
      path: "/history",
      icon: History,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col p-5">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-blue-600 p-2 rounded-lg">
          <BrainCircuit size={25} />
        </div>

        <div>
          <h1 className="font-bold text-lg">ChurnAI</h1>
          <p className="text-xs text-slate-400">
            Customer Analytics
          </p>
        </div>
      </div>

      {/* Navigation */}
      <p className="text-xs text-slate-500 uppercase mb-4">
        Main Menu
      </p>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="mt-auto border-t border-slate-700 pt-5">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3">
          <Settings size={19} />
          <span className="text-sm">Settings</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;