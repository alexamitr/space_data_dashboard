import { useState } from "react";
import { Menu, X, LayoutDashboard, BarChart, Settings } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-[#121212] text-gray-300 p-5 transition-all ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4 text-gray-400 hover:text-white">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Menu */}
      <nav className="space-y-4">
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1E1E1E] hover:text-cyan-400 transition duration-300"
        >
          <LayoutDashboard size={24} className="text-cyan-400" />
          {isOpen && <span>Dashboard</span>}
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1E1E1E] hover:text-purple-400 transition duration-300"
        >
          <BarChart size={24} className="text-purple-400" />
          {isOpen && <span>Analytics</span>}
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1E1E1E] hover:text-green-400 transition duration-300"
        >
          <Settings size={24} className="text-green-400" />
          {isOpen && <span>Settings</span>}
        </a>
      </nav>
    </div>
  );
}
