
import React from 'react';
import { INDUSMART_SECTIONS } from '../constants';

const InduSmartLogo = () => (
  <div className="relative w-10 h-10 flex-shrink-0">
    {/* Outer Glow/Ring */}
    <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse" />
    
    {/* Main Circle with Gradient */}
    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/30 flex items-center justify-center shadow-xl overflow-hidden">
      {/* Background Pattern (Subtle Gear Teeth) */}
      <svg viewBox="0 0 100 100" className="absolute w-full h-full opacity-10 rotate-45">
        <path d="M50 10 L60 0 L40 0 Z M50 90 L60 100 L40 100 Z M10 50 L0 60 L0 40 Z M90 50 L100 60 L100 40 Z" fill="white" />
      </svg>
      
      {/* Central Monogram */}
      <span className="text-white font-black text-sm tracking-tighter z-10">IS</span>
      
      {/* Smart Pulse Dot */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-400 rounded-full border border-indigo-900 shadow-sm" />
    </div>
  </div>
);

interface SidebarProps {
  activeSection: string;
  onSectionSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionSelect }) => {
  return (
    <aside className="w-full md:w-64 bg-gray-800 border-r border-gray-700 h-full flex flex-col">
      <div className="p-6 border-b border-gray-700 flex items-center space-x-3">
        <InduSmartLogo />
        <div className="overflow-hidden">
          <h1 className="text-xl font-bold text-blue-400 tracking-tight leading-none truncate">InduSmart</h1>
          <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-[0.2em] font-bold">Industry 4.0</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {INDUSMART_SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionSelect(section.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === section.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
            }`}
          >
            {section.icon}
            <span className="text-sm font-medium">{section.title.split('. ')[1]}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <p className="text-[10px] text-gray-500 text-center italic">Ready for College Presentation</p>
      </div>
    </aside>
  );
};

export default Sidebar;
