
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { analyzeMachineData } from '../services/gemini';

// Updated IconWrapper props type to make children optional, ensuring JSX children are correctly accepted by the compiler
const IconWrapper = ({ children, className = "w-4 h-4" }: { children?: React.ReactNode, className?: string }) => (
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
  Activity: <IconWrapper className="w-4 h-4"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></IconWrapper>,
  Thermometer: <IconWrapper className="w-4 h-4"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" /></IconWrapper>,
  Zap: <IconWrapper className="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></IconWrapper>,
  AlertTriangle: <IconWrapper className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></IconWrapper>
};

const DashboardPreview: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>("Initializing...");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev, {
          time: new Date().toLocaleTimeString(),
          power: 4000 + Math.random() * 500,
          temp: 60 + Math.random() * 5,
          vibration: 0.1 + Math.random() * 0.1
        }].slice(-15);
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAIAnalyze = async () => {
    if (data.length === 0) return;
    setIsAnalyzing(true);
    const lastPoint = data[data.length - 1];
    const insight = await analyzeMachineData(lastPoint);
    setCurrentStatus(insight);
    setIsAnalyzing(false);
  };

  const latest = data[data.length - 1] || { power: 0, temp: 0, vibration: 0 };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center space-x-2 text-blue-400 mb-2">
            {Icons.Zap}
            <span className="text-sm font-semibold">Active Power</span>
          </div>
          <p className="text-3xl font-bold">{latest.power.toFixed(0)} W</p>
          <p className="text-xs text-gray-500 mt-1">Real-time load tracking</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center space-x-2 text-orange-400 mb-2">
            {Icons.Thermometer}
            <span className="text-sm font-semibold">Temperature</span>
          </div>
          <p className="text-3xl font-bold">{latest.temp.toFixed(1)} °C</p>
          <p className="text-xs text-gray-500 mt-1">Critical threshold: 85°C</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center space-x-2 text-green-400 mb-2">
            {Icons.Activity}
            <span className="text-sm font-semibold">Vibration</span>
          </div>
          <p className="text-3xl font-bold">{latest.vibration.toFixed(2)} g</p>
          <p className="text-xs text-gray-500 mt-1">Anomalous pattern detection</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold mb-6 flex justify-between items-center">
          Live Telemetry Trend
          <button 
            onClick={handleAIAnalyze}
            disabled={isAnalyzing}
            className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full transition disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing..." : "AI Health Check"}
          </button>
        </h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} />
              <YAxis stroke="#9ca3af" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="power" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPower)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 bg-gray-900 rounded-lg flex items-start space-x-3 border-l-4 border-blue-500">
          {Icons.AlertTriangle}
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">AI Status:</span> {currentStatus === "Initializing..." ? "Click 'AI Health Check' to analyze current machine state." : currentStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
