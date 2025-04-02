import { Bell, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#121212] text-gray-300 p-4 shadow-md flex items-center justify-between">
      {/* Left Side - Logo / Title */}
      <div className="text-xl font-bold text-cyan-400">🚀 Space Missions Dashboard</div>

      {/* Right Side - Icons */}
      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-cyan-300 transition">
          <Bell size={24} />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative flex items-center gap-2 text-gray-400 hover:text-purple-400 transition"
        >
          <User size={24} />
          <span className="hidden md:inline">Profile</span>
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-gray-400 hover:text-green-400 transition" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={24} />
      </button>

      {/* Dropdown Menu (For Mobile) */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-[#1E1E1E] shadow-lg rounded-md p-4 w-48">
          <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Profile</a>
          <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">Settings</a>
          <a href="#" className="block py-2 px-4 text-red-400 hover:bg-gray-700 rounded">Logout</a>
        </div>
      )}
    </nav>
  );
}
