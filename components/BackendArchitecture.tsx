
import React, { useState } from 'react';

const Icons = {
  Database: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Code: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Link: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
};

const BackendArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'schema' | 'api'>('stack');

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mt-6 shadow-2xl">
      <div className="flex bg-gray-800/50 p-1 border-b border-gray-800">
        {(['stack', 'schema', 'api'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {tab === 'stack' ? 'Tech Stack' : tab === 'schema' ? 'DB Schema' : 'API Endpoints'}
          </button>
        ))}
      </div>

      <div className="p-6 h-[400px] overflow-y-auto">
        {activeTab === 'stack' && (
          <div className="grid grid-cols-2 gap-4 animate-in zoom-in duration-300">
            {[
              { name: 'Node.js', role: 'Runtime Engine', desc: 'Scalable V8 powered execution', color: 'border-green-500/30' },
              { name: 'Express', role: 'Web Framework', desc: 'Lightweight REST API handling', color: 'border-blue-500/30' },
              { name: 'MongoDB', role: 'Main Database', desc: 'NoSQL storage for telemetry', color: 'border-green-600/30' },
              { name: 'Socket.io', role: 'Real-time', desc: 'Websocket events for UI', color: 'border-orange-500/30' },
              { name: 'Redis', role: 'Cache Layer', desc: 'Sub-ms data retrieval', color: 'border-red-500/30' },
              { name: 'JWT', role: 'Security', desc: 'Bearer token authentication', color: 'border-purple-500/30' }
            ].map(item => (
              <div key={item.name} className={`p-4 bg-gray-800/50 border rounded-xl hover:bg-gray-800 transition-colors ${item.color}`}>
                <h5 className="font-black text-white text-sm">{item.name}</h5>
                <p className="text-[10px] text-blue-400 font-bold mb-1">{item.role}</p>
                <p className="text-[10px] text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
             {[
               { table: 'Users', fields: ['id', 'email', 'password_hash', 'role', 'factory_id'] },
               { table: 'Machines', fields: ['m_id', 'type', 'installation_date', 'status', 'meta_data'] },
               { table: 'Telemetry', fields: ['m_id', 'timestamp', 'v', 'c', 'p', 'temp', 'vib'] },
               { table: 'Alerts', fields: ['id', 'm_id', 'severity', 'message', 'acknowledged'] },
             ].map(item => (
               <div key={item.table} className="bg-gray-800/40 border border-gray-700 rounded-lg p-3">
                 <div className="flex items-center space-x-2 mb-2">
                   <Icons.Database />
                   <span className="font-bold text-blue-400 text-xs">{item.table}</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {item.fields.map(f => (
                     <span key={f} className="bg-gray-900 border border-gray-700 px-2 py-1 rounded font-mono text-[9px] text-gray-400">{f}</span>
                   ))}
                 </div>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            {[
              { method: 'GET', path: '/api/v1/machines', desc: 'Fetch all factory nodes' },
              { method: 'GET', path: '/api/v1/history/:id', desc: 'Time-series trend data' },
              { method: 'POST', path: '/api/v1/alerts/ack', desc: 'Acknowledge critical alert' },
              { method: 'POST', path: '/api/v1/auth/login', desc: 'Secure industrial login' },
              { method: 'PUT', path: '/api/v1/config/:id', desc: 'Remote sensor tuning' }
            ].map(api => (
              <div key={api.path} className="group flex items-center bg-gray-800/30 p-3 rounded-lg border border-transparent hover:border-gray-700 transition-all">
                <span className={`w-14 text-[9px] font-black px-2 py-1 rounded text-center mr-4 ${api.method === 'GET' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'}`}>
                  {api.method}
                </span>
                <div className="flex-1">
                  <p className="font-mono text-[10px] text-white tracking-tight">{api.path}</p>
                  <p className="text-[9px] text-gray-500">{api.desc}</p>
                </div>
                <Icons.Link />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-900/80 border-t border-gray-800 flex justify-between items-center">
        <span className="text-[9px] text-gray-600 font-bold uppercase">Status: Production Ready</span>
        <div className="flex space-x-2">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[9px] text-green-500 font-bold">API LATEST</span>
        </div>
      </div>
    </div>
  );
};

export default BackendArchitecture;
