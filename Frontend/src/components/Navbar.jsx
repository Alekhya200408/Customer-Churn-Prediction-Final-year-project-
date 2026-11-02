
import { Bell, Search, UserCircle, Menu } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6">

      <div className="flex items-center gap-4">

        {/* Hamburger Button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
        >
          <Menu size={25} />
        </button>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Customer Churn Analytics
          </h2>

          <p className="text-sm text-slate-500">
            Monitor and predict customer churn
          </p>
        </div>

      </div>

      <div className="flex items-center gap-5">

        <button className="text-slate-500 hover:text-blue-600">
          <Search size={21} />
        </button>

        <button className="text-slate-500 hover:text-blue-600">
          <Bell size={21} />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={32} className="text-blue-600" />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Admin
            </p>
            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>

      </div>

    </header>
  );
};

export default Navbar;
