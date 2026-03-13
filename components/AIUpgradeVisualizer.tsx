
import React, { useState, useEffect } from 'react';

const Icons = {
  Brain: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.73-4.35 2.5 2.5 0 0 1 .19-4.18 2.5 2.5 0 0 1 1-4.81A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.73-4.35 2.5 2.5 0 0 0-.19-4.18 2.5 2.5 0 0 0-1-4.81A2.5 2.5 0 0 0 14.5 2z" strokeWidth="2"/></svg>,
  Alert: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
};

const AIUpgradeVisualizer: React.FC = () => {
  const [isAnomaly, setIsAnomaly] = useState(false);
  const [confidence, setConfidence] = useState(98);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl overflow-hidden mb-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
            <Icons.Brain />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">AI Predictive Maintenance</h3>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Neural Network Diagnostic</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAnomaly(!isAnomaly)}
          className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all border ${isAnomaly ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-green-500/10 border-green-500 text-green-500'}`}
        >
          {isAnomaly ? 'STOP SIMULATION' : 'SIMULATE ANOMALY'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Signal Waveform */}
        <div className="bg-black/40 rounded-xl p-4 border border-gray-800 relative h-40 flex items-center justify-center overflow-hidden">
          <div className="absolute top-2 left-4 text-[9px] font-bold text-gray-600 uppercase">Input Vibration Spectrum</div>
          <svg viewBox="0 0 200 60" className="w-full h-full">
            <path
              d={isAnomaly 
                ? "M0 30 Q 10 10, 20 50 T 40 30 T 60 50 T 80 10 T 100 45 T 120 15 T 140 55 T 160 25 T 180 35 T 200 30" 
                : "M0 30 Q 25 25, 50 30 T 100 30 T 150 30 T 200 30"}
              fill="none"
              stroke={isAnomaly ? "#ef4444" : "#3b82f6"}
              strokeWidth="2"
              className="transition-all duration-500"
            />
          </svg>
          {isAnomaly && <div className="absolute inset-0 bg-red-500/5 animate-pulse" />}
        </div>

        {/* AI Analysis */}
        <div className="space-y-4">
          <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase">Confidence Score</span>
              <span className={`text-[10px] font-bold ${isAnomaly ? 'text-red-400' : 'text-blue-400'}`}>{confidence}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${isAnomaly ? 'bg-red-500' : 'bg-blue-500'}`} 
                style={{ width: `${confidence}%` }} 
              />
            </div>
          </div>

          <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700">
            {isAnomaly ? (
              <div className="flex items-start space-x-3 text-red-400 animate-in fade-in slide-in-from-left">
                <Icons.Alert />
                <div>
                  <p className="text-xs font-black uppercase">Failure Predicted</p>
                  <p className="text-[10px] text-gray-400 mt-1">Pattern match: <span className="text-red-300">Bearing Outer Race Wear</span>. Estimated Remaining Useful Life (RUL): <span className="text-white font-bold">14 Hours</span>.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-3 text-green-400">
                <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase">System Healthy</p>
                  <p className="text-[10px] text-gray-400 mt-1">AI Monitoring active. Current vibration signatures are within 1.2 standard deviations of nominal.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIUpgradeVisualizer;
