
import React from 'react';

const JSONDataViewer: React.FC = () => {
  const jsonContent = {
    m_id: "CNC-01",
    p: 4500,
    v: 230,
    c: 19.5,
    t: 65,
    vib: 0.23,
    ts: 1715432100
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mt-4">
      <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sample MQTT Payload</span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-600" />
          <div className="w-2 h-2 rounded-full bg-gray-600" />
          <div className="w-2 h-2 rounded-full bg-gray-600" />
        </div>
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed">
        <div className="text-gray-300">
          <span className="text-blue-400">{'{'}</span>
          <div className="pl-6 space-y-1">
            <p className="group"><span className="text-purple-400">"m_id"</span>: <span className="text-green-400">"CNC-01"</span>, <span className="hidden group-hover:inline text-[9px] text-gray-500 italic ml-2">// Machine ID</span></p>
            <p className="group"><span className="text-purple-400">"p"</span>: <span className="text-orange-400">4500</span>, <span className="hidden group-hover:inline text-[9px] text-gray-500 italic ml-2">// Power (W)</span></p>
            <p className="group"><span className="text-purple-400">"v"</span>: <span className="text-orange-400">230</span>, <span className="hidden group-hover:inline text-[9px] text-gray-500 italic ml-2">// Voltage (V)</span></p>
            <p className="group"><span className="text-purple-400">"c"</span>: <span className="text-orange-400">19.5</span>, <span className="hidden group-hover:inline text-[9px] text-gray-500 italic ml-2">// Current (A)</span></p>
            <p className="group"><span className="text-purple-400">"t"</span>: <span className="text-orange-400">65</span>, <span className="hidden group-hover:inline text-[9px] text-gray-500 italic ml-2">// Temp (°C)</span></p>
            <p className="group"><span className="text-purple-400">"vib"</span>: <span className="text-orange-400">0.23</span>, <span className="hidden group-hover:inline text-[9px] text-gray-500 italic ml-2">// Vibration (g)</span></p>
            <p className="group"><span className="text-purple-400">"ts"</span>: <span className="text-gray-400">1715432100</span> <span className="hidden group-hover:inline text-[9px] text-gray-500 italic ml-2">// Unix Timestamp</span></p>
          </div>
          <span className="text-blue-400">{'}'}</span>
        </div>
      </div>
    </div>
  );
};

export default JSONDataViewer;
