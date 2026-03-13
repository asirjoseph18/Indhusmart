
import React, { useState } from 'react';

const Icons = {
  Leaf: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 20a1 1 0 0 1-1-1v-5c0-1.1.9-2 2-2h5a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-5zM11 20H5a2 2 0 0 1-2-2v-5c0-1.1.9-2 2-2h5a1 1 0 0 1 1 1v5M2 9c1.5-3 5-5 10-5s8.5 2 10 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Sun: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 12h2M4.22 19.78l1.42-1.42M19.78 4.22l-1.42 1.42" strokeWidth="2" strokeLinecap="round"/></svg>
};

const CarbonTrackerVisualizer: React.FC = () => {
  const [solarMix, setSolarMix] = useState(25); // Percentage of solar power
  
  // Basic calculation: 1 kWh = 0.4kg CO2 (Grid) vs 0.05kg CO2 (Solar)
  const currentConsumption = 450; // kWh per day
  const carbonFootprint = (currentConsumption * (1 - solarMix/100) * 0.4) + (currentConsumption * (solarMix/100) * 0.05);
  const treesSaved = (carbonFootprint < 180) ? Math.floor((180 - carbonFootprint) / 2) : 0;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
            <Icons.Leaf />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Carbon Footprint Tracker</h3>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Sustainability Analytics</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-black/40 p-4 rounded-xl border border-gray-800 text-center">
          <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Daily CO2 Output</p>
          <p className="text-2xl font-black text-white">{carbonFootprint.toFixed(1)} <span className="text-[10px] text-gray-400 font-normal">kg</span></p>
        </div>
        <div className="bg-black/40 p-4 rounded-xl border border-gray-800 text-center">
          <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Energy Offset</p>
          <p className="text-2xl font-black text-emerald-500">{solarMix}%</p>
        </div>
        <div className="bg-black/40 p-4 rounded-xl border border-gray-800 text-center">
          <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Trees Equivalent</p>
          <p className="text-2xl font-black text-blue-400">{treesSaved}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <Icons.Sun />
              <span className="text-xs font-bold text-gray-300">Renewable Energy Mix</span>
            </div>
            <span className="text-xs font-mono text-emerald-400">{solarMix}% Solar / {100-solarMix}% Grid</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={solarMix} 
            onChange={(e) => setSolarMix(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
          <p className="text-[10px] text-emerald-400 leading-relaxed uppercase tracking-widest font-bold mb-2">Impact Summary</p>
          <p className="text-xs text-gray-400">
            By increasing your solar mix to <span className="text-white font-bold">{solarMix}%</span>, you are preventing the emission of <span className="text-white font-bold">{(180 - carbonFootprint).toFixed(1)}kg</span> of CO2 daily. This is equivalent to planting <span className="text-white font-bold">{treesSaved} trees</span> per year.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonTrackerVisualizer;
