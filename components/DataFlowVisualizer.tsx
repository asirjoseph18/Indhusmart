
import React, { useState, useEffect } from 'react';

const Icons = {
  Sensor: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeWidth="2" strokeLinecap="round"/></svg>,
  Cpu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" strokeWidth="2"/></svg>,
  Wifi: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" strokeWidth="2" strokeLinecap="round"/></svg>,
  Database: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeWidth="2"/></svg>
};

const DataFlowVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Collection", desc: "Sensors read physical parameters 100x/sec", icon: <Icons.Sensor /> },
    { title: "Processing", desc: "Edge Gateway aggregates & calculates RMS", icon: <Icons.Cpu /> },
    { title: "Transmission", desc: "MQTT Publish to 'factory/m1/telemetry'", icon: <Icons.Wifi /> },
    { title: "Storage & Alert", desc: "Subscribed backend saves to DB & alerts", icon: <Icons.Database /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-white">Sensor Data Lifecycle</h3>
          <p className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-bold">End-to-End Pipeline</p>
        </div>
        <div className="text-xs font-mono text-gray-500 bg-black/40 px-3 py-1 rounded-full">
          Step {activeStep + 1} of 4
        </div>
      </div>

      {/* Visual Pipeline */}
      <div className="relative flex justify-between items-center mb-10 px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2" />
        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center">
            <div 
              onClick={() => setActiveStep(idx)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 cursor-pointer ${
                activeStep === idx 
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_#2563eb] scale-110' 
                  : 'bg-gray-800 text-gray-500 border border-gray-700 hover:border-gray-500'
              }`}
            >
              {step.icon}
            </div>
            <div className={`mt-3 text-[10px] font-bold uppercase tracking-wider transition-opacity duration-500 ${activeStep === idx ? 'text-blue-400 opacity-100' : 'text-gray-600 opacity-50'}`}>
              {step.title}
            </div>
            {/* Connection Arrow Animation */}
            {idx < steps.length - 1 && activeStep === idx && (
              <div className="absolute top-1/2 left-full w-full h-1 -translate-y-1/2 overflow-hidden pointer-events-none">
                <div className="w-1/2 h-full bg-blue-400/50 animate-[slide_1s_infinite]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content Display */}
      <div className="bg-black/30 rounded-xl p-5 border border-gray-800/50 min-h-[100px] flex items-center animate-in slide-in-from-bottom duration-500" key={activeStep}>
        <div className="mr-4 text-blue-500 bg-blue-500/10 p-3 rounded-lg">
          {steps[activeStep].icon}
        </div>
        <div>
          <h4 className="text-white font-bold text-sm uppercase mb-1">{steps[activeStep].title}</h4>
          <p className="text-gray-400 text-sm">{steps[activeStep].desc}</p>
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default DataFlowVisualizer;
