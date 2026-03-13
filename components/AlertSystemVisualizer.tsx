
import React, { useState, useEffect } from 'react';

const Icons = {
  Bell: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Message: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2"/></svg>,
  Phone: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeWidth="2"/></svg>,
  Mail: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/><polyline points="22,6 12,13 2,6" strokeWidth="2"/></svg>,
  Zap: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeWidth="2"/></svg>
};

const AlertSystemVisualizer: React.FC = () => {
  const [temp, setTemp] = useState(65);
  const [alertLevel, setAlertLevel] = useState<'Normal' | 'Warning' | 'Critical'>('Normal');

  useEffect(() => {
    if (temp >= 100) setAlertLevel('Critical');
    else if (temp >= 80) setAlertLevel('Warning');
    else setAlertLevel('Normal');
  }, [temp]);

  const methods = [
    { name: 'App Push', icon: <Icons.Bell />, minLevel: 'Normal', active: true },
    { name: 'Dashboard', icon: <Icons.Zap />, minLevel: 'Normal', active: true },
    { name: 'Email Log', icon: <Icons.Mail />, minLevel: 'Warning', active: alertLevel !== 'Normal' },
    { name: 'SMS Alert', icon: <Icons.Message />, minLevel: 'Critical', active: alertLevel === 'Critical' },
    { name: 'Voice Call', icon: <Icons.Phone />, minLevel: 'Critical', active: alertLevel === 'Critical' }
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Threshold & Method Engine</h3>
          <p className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-bold">Industrial Response Logic</p>
        </div>
        <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
          alertLevel === 'Critical' ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' :
          alertLevel === 'Warning' ? 'bg-orange-500/10 border-orange-500 text-orange-500' :
          'bg-green-500/10 border-green-500 text-green-500'
        }`}>
          {alertLevel} State
        </div>
      </div>

      {/* Threshold Control */}
      <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-gray-400 uppercase">Simulate Temperature</span>
          <span className={`text-xl font-black font-mono transition-colors duration-300 ${
            alertLevel === 'Critical' ? 'text-red-500' : 
            alertLevel === 'Warning' ? 'text-orange-500' : 
            'text-blue-400'
          }`}>{temp}°C</span>
        </div>
        
        <input 
          type="range" 
          min="40" 
          max="120" 
          value={temp} 
          onChange={(e) => setTemp(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-4"
        />

        <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter text-gray-600">
          <span>Safe (40°C)</span>
          <span className="text-orange-500/50">Threshold (80°C)</span>
          <span className="text-red-500/50">Critical (100°C)</span>
        </div>
      </div>

      {/* Method Visualization */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Notification Matrix</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {methods.map((method, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-500 ${
                method.active 
                  ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                  : 'bg-gray-800/30 border-gray-800 text-gray-600 opacity-40 grayscale'
              }`}
            >
              <div className={`mb-2 transition-transform duration-500 ${method.active ? 'scale-110' : 'scale-100'}`}>
                {method.icon}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-center">{method.name}</span>
              {method.active && (
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scenario Logic Output */}
      <div className={`p-4 rounded-xl border transition-all duration-500 ${
        alertLevel === 'Critical' ? 'bg-red-500/5 border-red-500/30' :
        alertLevel === 'Warning' ? 'bg-orange-500/5 border-orange-500/30' :
        'bg-blue-500/5 border-blue-500/30'
      }`}>
        <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Automated Execution Log</p>
        <div className="space-y-2 font-mono text-[10px]">
          <div className="flex items-center space-x-2 text-green-500/80">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>[SYSTEM] Monitoring active...</span>
          </div>
          {alertLevel !== 'Normal' && (
            <div className="flex items-center space-x-2 text-orange-400 animate-in slide-in-from-left">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
              <span>[WARNING] Threshold reached. Dispatching Email report.</span>
            </div>
          )}
          {alertLevel === 'Critical' && (
            <div className="flex items-center space-x-2 text-red-500 animate-in slide-in-from-left">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
              <span>[CRITICAL] Emergency state. Triggering SMS & Auto-Dialer.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertSystemVisualizer;
