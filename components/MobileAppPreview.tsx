
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const IconWrapper = ({ children, className = "w-5 h-5" }: { children?: React.ReactNode, className?: string }) => (
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
  Fingerprint: <IconWrapper><path d="M2 12a10 10 0 0 1 18-6" /><path d="M7 10a5 5 0 0 1 10 0" /><path d="M12 20a8 8 0 0 0 8-8" /><path d="M12 12v.01" /><path d="M16 12a4 4 0 0 1-4 4" /><path d="M8 12a4 4 0 0 1 8 0" /><path d="M3 12a9 9 0 0 1 15-6.7" /></IconWrapper>,
  Layout: <IconWrapper className="w-4 h-4"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></IconWrapper>,
  Activity: <IconWrapper className="w-4 h-4"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></IconWrapper>,
  BarChart: <IconWrapper className="w-4 h-4"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></IconWrapper>,
  User: <IconWrapper className="w-4 h-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></IconWrapper>,
  Battery: <IconWrapper className="w-4 h-4"><rect x="2" y="7" width="16" height="10" rx="2" ry="2" /><line x1="22" y1="11" x2="22" y2="13" /></IconWrapper>
};

const energyData = [
  { day: 'Mon', kwh: 120 },
  { day: 'Tue', kwh: 150 },
  { day: 'Wed', kwh: 180 },
  { day: 'Thu', kwh: 140 },
  { day: 'Fri', kwh: 190 },
  { day: 'Sat', kwh: 110 },
  { day: 'Sun', kwh: 95 },
];

const MobileAppPreview: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'login' | 'dashboard' | 'detail' | 'analytics'>('login');
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === '1234') {
        handleLoginSuccess();
      } else {
        setPin('');
      }
    }
  }, [pin]);

  const handleLoginSuccess = () => {
    setIsUnlocked(true);
    setCurrentTab('analytics'); // User requested to go directly to Analytics
  };

  const renderScreen = () => {
    switch (currentTab) {
      case 'login':
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 space-y-8 animate-in fade-in duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/40">
                <span className="text-white font-bold text-2xl">IS</span>
              </div>
              <h2 className="text-xl font-bold text-white">Factory Login</h2>
              <p className="text-xs text-gray-500">Secure Industrial Access</p>
            </div>

            <div className="flex space-x-3">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full border border-blue-500 ${pin.length > i ? 'bg-blue-500' : 'bg-transparent'}`} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-[200px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button 
                  key={num} 
                  onClick={() => setPin(prev => prev + num)}
                  className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-bold flex items-center justify-center transition-colors"
                >
                  {num}
                </button>
              ))}
              <div />
              <button 
                onClick={() => setPin(prev => prev + '0')}
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-bold flex items-center justify-center transition-colors"
              >
                0
              </button>
              <div />
            </div>

            <button 
              onClick={handleLoginSuccess}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="p-3 bg-gray-800 rounded-full group-active:scale-95 transition-transform text-blue-400 border border-blue-500/20">
                {Icons.Fingerprint}
              </div>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Biometric Login</span>
            </button>
          </div>
        );

      case 'dashboard':
        return (
          <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Machine Health</h2>
              <div className="px-2 py-1 bg-green-500/20 text-green-500 text-[10px] rounded-full font-bold">98% UP</div>
            </div>
            
            {[
              { id: 'CNC-01', status: 'Optimal', health: 95, color: 'text-green-500' },
              { id: 'Lathe-02', status: 'Warning', health: 72, color: 'text-yellow-500' },
              { id: 'Press-A3', status: 'Optimal', health: 91, color: 'text-green-500' },
              { id: 'Robot-K', status: 'Critical', health: 45, color: 'text-red-500' },
            ].map((m) => (
              <div key={m.id} onClick={() => setCurrentTab('detail')} className="bg-gray-800 p-3 rounded-xl border border-gray-700 flex items-center justify-between cursor-pointer active:scale-95 transition-transform">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-10 rounded-full ${m.color.replace('text', 'bg')}`} />
                  <div>
                    <h3 className="font-bold text-sm">{m.id}</h3>
                    <p className={`text-[10px] ${m.color}`}>{m.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white">{m.health}%</p>
                  <div className="w-16 h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                    <div className={`h-full ${m.color.replace('text', 'bg')}`} style={{ width: `${m.health}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'detail':
        return (
          <div className="p-4 space-y-6 animate-in slide-in-from-right duration-300">
            <button onClick={() => setCurrentTab('dashboard')} className="text-[10px] font-bold text-blue-400 flex items-center mb-2">
              <IconWrapper className="w-3 h-3 mr-1"><polyline points="15 18 9 12 15 6" /></IconWrapper>
              BACK TO LIST
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl font-black text-white">CNC-01</h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Main Assembly Line</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-700">
                <p className="text-[10px] font-bold text-gray-500 mb-2 uppercase">Voltage</p>
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-900" />
                    <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="219" strokeDashoffset="44" className="text-blue-500" />
                  </svg>
                  <span className="absolute text-sm font-bold">230V</span>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-700">
                <p className="text-[10px] font-bold text-gray-500 mb-2 uppercase">Current</p>
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-900" />
                    <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="219" strokeDashoffset="120" className="text-orange-500" />
                  </svg>
                  <span className="absolute text-sm font-bold">14.2A</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col items-center">
               <p className="text-[10px] font-bold text-gray-500 mb-2 uppercase">Temp Gauge</p>
               <div className="w-full h-4 bg-gray-900 rounded-full mt-2 relative overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 w-[75%]" />
                  <div className="absolute top-0 left-[75%] w-1 h-full bg-white shadow-lg" />
               </div>
               <div className="flex justify-between w-full mt-2">
                 <span className="text-[10px] text-gray-600 font-bold">0°C</span>
                 <span className="text-lg font-bold text-white">68.5 °C</span>
                 <span className="text-[10px] text-gray-600 font-bold">100°C</span>
               </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-white">Daily Consumption</h2>
              <p className="text-xs text-gray-500">Real-time Energy Analytics</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyData}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#6b7280'}} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#6b7280'}} 
                    width={25}
                  />
                  <Tooltip 
                    cursor={{fill: '#374151', opacity: 0.4}} 
                    contentStyle={{backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '10px'}} 
                    itemStyle={{color: '#fff'}} 
                  />
                  <Bar dataKey="kwh" radius={[4, 4, 0, 0]}>
                    {energyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.kwh > 150 ? '#ef4444' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Power</p>
                <div className="flex items-baseline space-x-1">
                  <p className="text-xl font-black text-white">920</p>
                  <span className="text-[10px] text-gray-400">kWh</span>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Efficiency</p>
                <div className="flex items-baseline space-x-1">
                  <p className="text-xl font-black text-green-500">+12.5%</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-[10px] text-blue-400 leading-tight">
                <span className="font-bold">Insight:</span> Wednesday saw the peak load. Optimal scheduling recommended for upcoming shifts.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center py-4">
      {/* Phone Frame */}
      <div className="w-[280px] h-[580px] bg-black rounded-[40px] border-8 border-gray-800 shadow-2xl relative overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20" />
        
        {/* Status Bar */}
        <div className="pt-8 px-6 flex justify-between items-center z-10">
          <span className="text-[10px] font-bold">9:41</span>
          <div className="flex space-x-1 items-center">
            {Icons.Activity}
            {Icons.Battery}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-gray-950">
          {renderScreen()}
        </div>

        {/* Navigation Bar */}
        {isUnlocked && (
          <div className="h-16 bg-gray-900 border-t border-gray-800 flex justify-around items-center px-4 z-20">
            <button onClick={() => setCurrentTab('analytics')} className={`p-2 rounded-lg transition-colors ${currentTab === 'analytics' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500'}`}>
              {Icons.BarChart}
            </button>
            <button onClick={() => setCurrentTab('dashboard')} className={`p-2 rounded-lg transition-colors ${currentTab === 'dashboard' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500'}`}>
              {Icons.Layout}
            </button>
            <button onClick={() => setCurrentTab('detail')} className={`p-2 rounded-lg transition-colors ${currentTab === 'detail' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500'}`}>
              {Icons.Activity}
            </button>
            <button className={`p-2 rounded-lg transition-colors text-gray-500`}>
              {Icons.User}
            </button>
          </div>
        )}
        
        {/* Home Indicator */}
        <div className="h-1.5 w-32 bg-gray-800 rounded-full mx-auto mb-2" />
      </div>
    </div>
  );
};

export default MobileAppPreview;
