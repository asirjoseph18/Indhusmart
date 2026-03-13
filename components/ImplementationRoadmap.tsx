
import React, { useState } from 'react';

const ImplementationRoadmap: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const phases = [
    {
      title: "Phase 1: Prototyping",
      subtitle: "Hardware Validation",
      icon: "🛠️",
      items: [
        "ESP32 + CT Sensor development",
        "Local MQTT (Mosquitto) setup",
        "Basic Calibration algorithms",
        "Proof-of-concept breadboard"
      ],
      color: "blue"
    },
    {
      title: "Phase 2: MVP",
      subtitle: "Full Stack Integration",
      icon: "🚀",
      items: [
        "Node.js Backend & MongoDB deployment",
        "React Web Dashboard with Recharts",
        "Mobile App (React Native) prototype",
        "Field testing on one CNC machine"
      ],
      color: "indigo"
    },
    {
      title: "Phase 3: Scaling",
      subtitle: "Industrial Production",
      icon: "🏢",
      items: [
        "Custom PCB (SMD) manufacturing",
        "Industrial enclosures (IP65)",
        "AI Predictive Maintenance models",
        "Load testing for 100+ gateways"
      ],
      color: "green"
    }
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-xl font-bold text-white mb-1">Execution Roadmap</h3>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Path to Deployment</p>
      </div>

      <div className="flex bg-gray-950 p-2 border-b border-gray-800">
        {phases.map((phase, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPhase(idx)}
            className={`flex-1 py-3 px-2 rounded-xl text-center transition-all duration-300 ${
              selectedPhase === idx 
                ? `bg-${phase.color}-600/20 border border-${phase.color}-500/50 text-${phase.color}-400` 
                : 'text-gray-500 hover:bg-gray-900 hover:text-gray-300'
            }`}
          >
            <div className="text-lg mb-1">{phase.icon}</div>
            <div className="text-[9px] font-black uppercase tracking-tighter">Step {idx + 1}</div>
          </button>
        ))}
      </div>

      <div className="p-8 min-h-[320px] animate-in slide-in-from-right duration-300" key={selectedPhase}>
        <div className="flex items-center space-x-4 mb-6">
          <div className={`text-4xl bg-${phases[selectedPhase].color}-500/10 p-4 rounded-3xl border border-${phases[selectedPhase].color}-500/20`}>
            {phases[selectedPhase].icon}
          </div>
          <div>
            <h4 className="text-2xl font-black text-white leading-none">{phases[selectedPhase].title}</h4>
            <p className={`text-sm text-${phases[selectedPhase].color}-400 mt-2 font-bold uppercase tracking-widest`}>
              {phases[selectedPhase].subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {phases[selectedPhase].items.map((item, i) => (
            <div key={i} className="flex items-center space-x-3 bg-gray-800/40 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-colors group">
              <div className={`w-2 h-2 rounded-full bg-${phases[selectedPhase].color}-500 group-hover:scale-125 transition-transform`} />
              <span className="text-gray-300 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-950/50 border-t border-gray-800 flex justify-center">
         <div className="flex space-x-2">
           {[0, 1, 2].map(i => (
             <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${selectedPhase === i ? 'bg-blue-500 w-6' : 'bg-gray-700'}`} />
           ))}
         </div>
      </div>
    </div>
  );
};

export default ImplementationRoadmap;
