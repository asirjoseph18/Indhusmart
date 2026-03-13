
import React, { useState, useEffect } from 'react';

const IconWrapper = ({ children, className = "w-6 h-6" }: { children?: React.ReactNode, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

const Icons = {
  Cpu: <IconWrapper><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" /></IconWrapper>,
  Server: <IconWrapper><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></IconWrapper>,
  Cloud: <IconWrapper><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></IconWrapper>,
  Send: <IconWrapper className="w-4 h-4"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></IconWrapper>
};

const MQTTVisualizer: React.FC = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [logs, setLogs] = useState<{ id: number; msg: string; type: 'pub' | 'sub' | 'broker' }[]>([]);
  const [packetPos, setPacketPos] = useState(0); // 0: Start, 1: Broker, 2: End

  const publishData = () => {
    if (isPublishing) return;
    setIsPublishing(true);
    setPacketPos(0);
    
    const newLog = { id: Date.now(), msg: "PUBLISH: { temp: 65.2, v: 231 } to factory/m1", type: 'pub' as const };
    setLogs(prev => [newLog, ...prev].slice(0, 5));

    // Phase 1: To Broker
    setTimeout(() => {
      setPacketPos(1);
      setLogs(prev => [{ id: Date.now() + 1, msg: "BROKER: Routing to 3 subscribers", type: 'broker' as const }, ...prev].slice(0, 5));
    }, 1000);

    // Phase 2: To Subscriber
    setTimeout(() => {
      setPacketPos(2);
      setLogs(prev => [{ id: Date.now() + 2, msg: "SUBSCRIBE: Received telemetry at Cloud", type: 'sub' as const }, ...prev].slice(0, 5));
      setIsPublishing(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-lg font-bold text-white">MQTT Architecture Live</h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Pub/Sub Simulation</p>
        </div>
        <button 
          onClick={publishData}
          disabled={isPublishing}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-lg shadow-blue-900/40"
        >
          {Icons.Send}
          <span>Publish Packet</span>
        </button>
      </div>

      {/* Diagram Area */}
      <div className="relative h-40 flex items-center justify-between px-4 md:px-12 mb-8">
        {/* Connection Lines */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0" />
        
        {/* Animated Packet */}
        {isPublishing && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded shadow-[0_0_15px_#3b82f6] z-10 transition-all duration-1000 ease-linear"
            style={{ 
              left: packetPos === 0 ? '15%' : packetPos === 1 ? '50%' : '85%',
              opacity: isPublishing ? 1 : 0
            }}
          >
            <div className="w-full h-full animate-ping bg-blue-400 rounded-full opacity-75" />
          </div>
        )}

        {/* Nodes */}
        <div className="relative z-20 flex flex-col items-center group">
          <div className={`p-4 rounded-2xl border transition-all duration-500 ${packetPos === 0 && isPublishing ? 'bg-blue-500 border-blue-400 scale-110' : 'bg-gray-800 border-gray-700'}`}>
            {Icons.Cpu}
          </div>
          <span className="text-[10px] font-bold mt-2 text-gray-500 uppercase tracking-widest">Gateway</span>
          <span className="text-[8px] text-blue-400 font-mono">Publisher</span>
        </div>

        <div className="relative z-20 flex flex-col items-center">
          <div className={`p-4 rounded-2xl border transition-all duration-500 ${packetPos === 1 && isPublishing ? 'bg-blue-500 border-blue-400 scale-110' : 'bg-gray-800 border-gray-700'}`}>
            {Icons.Server}
          </div>
          <span className="text-[10px] font-bold mt-2 text-gray-500 uppercase tracking-widest">Broker</span>
          <span className="text-[8px] text-blue-400 font-mono">EMQX / HiveMQ</span>
        </div>

        <div className="relative z-20 flex flex-col items-center">
          <div className={`p-4 rounded-2xl border transition-all duration-500 ${packetPos === 2 && isPublishing ? 'bg-blue-500 border-blue-400 scale-110' : 'bg-gray-800 border-gray-700'}`}>
            {Icons.Cloud}
          </div>
          <span className="text-[10px] font-bold mt-2 text-gray-500 uppercase tracking-widest">Cloud</span>
          <span className="text-[8px] text-blue-400 font-mono">Subscriber</span>
        </div>
      </div>

      {/* Log Console */}
      <div className="bg-black/50 rounded-lg p-4 font-mono text-[10px] h-32 border border-gray-800/50">
        <div className="flex items-center space-x-2 text-gray-600 mb-2 border-b border-gray-800 pb-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="ml-2 uppercase tracking-tighter">MQTT Terminal Output</span>
        </div>
        <div className="space-y-1">
          {logs.length === 0 ? (
            <p className="text-gray-700 italic">Waiting for connection...</p>
          ) : logs.map(log => (
            <p key={log.id} className="animate-in slide-in-from-left duration-300">
              <span className="text-gray-500">[{new Date(log.id).toLocaleTimeString()}]</span>{' '}
              <span className={
                log.type === 'pub' ? 'text-blue-400' : 
                log.type === 'broker' ? 'text-yellow-400' : 'text-green-400'
              }>
                {log.msg}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MQTTVisualizer;
