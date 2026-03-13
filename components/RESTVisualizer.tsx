
import React, { useState } from 'react';

const Icons = {
  Globe: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Server: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  ArrowRight: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
};

const RESTVisualizer: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const simulateRequest = () => {
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-4">
      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">HTTP REST Simulator</h4>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center border border-blue-500/30">
            <Icons.Globe />
          </div>
          <span className="text-[10px] mt-2 font-mono">Mobile Client</span>
        </div>

        <div className="flex-1 w-full flex flex-col items-center">
          <div className="w-full bg-gray-800 rounded-lg p-2 flex items-center mb-2 border border-gray-700">
            <span className="text-green-400 text-[10px] font-bold px-2">GET</span>
            <span className="text-gray-300 text-[10px] font-mono flex-1">/api/v1/machines/CNC-01/history</span>
            <button 
              onClick={simulateRequest}
              disabled={status === 'sending'}
              className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] px-3 py-1 rounded font-bold transition-all disabled:opacity-50"
            >
              SEND
            </button>
          </div>
          <div className="relative w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            {status === 'sending' && (
              <div className="absolute top-0 h-full bg-blue-500 w-1/3 animate-[progress_1.5s_ease-in-out_infinite]" />
            )}
            <style>{`@keyframes progress { 0% { left: -30%; } 100% { left: 100%; } }`}</style>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${status === 'success' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
            <Icons.Server />
          </div>
          <span className="text-[10px] mt-2 font-mono text-gray-500">NodeJS API</span>
        </div>
      </div>

      {status === 'success' && (
        <div className="mt-4 p-3 bg-black/40 rounded border border-gray-800 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-bold text-green-500">200 OK</span>
            <span className="text-[8px] text-gray-600">application/json</span>
          </div>
          <pre className="text-[10px] text-blue-300 font-mono">
{`{
  "machine": "CNC-01",
  "status": "online",
  "uptime": "14d 2h",
  "data_points": 1440
}`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default RESTVisualizer;
