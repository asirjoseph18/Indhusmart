import React, { useState } from 'react';

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
  QrCode: <IconWrapper><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M7 17h.01" /><path d="M17 7h.01" /><path d="M17 17h.01" /></IconWrapper>,
  FileText: <IconWrapper><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></IconWrapper>,
  Download: <IconWrapper className="w-4 h-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></IconWrapper>
};

const WebAdminTools: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [reportType, setReportType] = useState<string | null>(null);
  const [reportProgress, setReportProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult("InduSensor v2.0 - SN: 8849-221");
    }, 2500);
  };

  const generateReport = (type: string) => {
    setReportType(type);
    setReportProgress(0);
    const interval = setInterval(() => {
      setReportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Device Provisioning */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
            {Icons.QrCode}
          </div>
          <h3 className="font-bold text-white uppercase text-xs tracking-widest">Device Provisioning</h3>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          {isScanning ? (
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-[scan_2s_infinite]" />
              <div className="text-[10px] text-gray-500 font-mono">ACCESSING CAMERA...</div>
              <style>{`
                @keyframes scan {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(150px); }
                }
              `}</style>
            </div>
          ) : scanResult ? (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center animate-in zoom-in duration-300">
              <p className="text-[10px] text-green-500 font-bold uppercase mb-1">Sensor Onboarded</p>
              <p className="text-sm font-mono text-white">{scanResult}</p>
              <button onClick={() => setScanResult(null)} className="mt-4 text-[10px] text-gray-500 hover:text-white uppercase font-bold tracking-widest underline">Reset</button>
            </div>
          ) : (
            <button 
              onClick={startScan}
              className="w-full h-32 border-2 border-dashed border-gray-800 rounded-lg flex flex-col items-center justify-center space-y-2 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-gray-500 hover:text-blue-400"
            >
              {Icons.QrCode}
              <span className="text-[10px] font-bold uppercase tracking-widest">Scan QR Code</span>
            </button>
          )}
        </div>
      </div>

      {/* Reporting */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            {Icons.FileText}
          </div>
          <h3 className="font-bold text-white uppercase text-xs tracking-widest">Reporting Engine</h3>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider font-semibold">Generate Weekly Energy Efficiency Reports</p>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              disabled={reportProgress > 0 && reportProgress < 100}
              onClick={() => generateReport('CSV')}
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg border border-gray-700 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
            >
              {Icons.Download}
              <span className="text-[10px] font-bold text-white">GENERATE CSV</span>
            </button>
            <button 
              disabled={reportProgress > 0 && reportProgress < 100}
              onClick={() => generateReport('PDF')}
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg border border-gray-700 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
            >
              {Icons.Download}
              <span className="text-[10px] font-bold text-white">GENERATE PDF</span>
            </button>
          </div>

          {reportProgress > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-indigo-400">{reportProgress < 100 ? `Compiling ${reportType}...` : 'Ready to Download'}</span>
                <span className="text-gray-500">{reportProgress}%</span>
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300" 
                  style={{ width: `${reportProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebAdminTools;
