
import React from 'react';

const Icons = {
  Dollar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
};

const BusinessVisualizer: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Revenue Breakdown */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
            <Icons.Dollar />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Revenue Composition</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative w-40 h-40 mx-auto">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path className="text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              {/* SaaS - 60% */}
              <path className="text-blue-500 transition-all duration-1000" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
              {/* Hardware - 30% (offset) */}
              <path className="text-emerald-500" strokeDasharray="30, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
              {/* Services - 10% (offset) */}
              <path className="text-yellow-500" strokeDasharray="10, 100" strokeDashoffset="-90" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-gray-500">MIX</span>
              <span className="text-lg font-black text-white">MRR+</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between group cursor-help">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm bg-blue-500" />
                <span className="text-sm text-gray-400">SaaS Subscriptions</span>
              </div>
              <span className="text-sm font-bold text-blue-400">60%</span>
            </div>
            <div className="flex items-center justify-between group cursor-help">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                <span className="text-sm text-gray-400">Hardware Sales</span>
              </div>
              <span className="text-sm font-bold text-emerald-400">30%</span>
            </div>
            <div className="flex items-center justify-between group cursor-help">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm bg-yellow-500" />
                <span className="text-sm text-gray-400">Expert Services</span>
              </div>
              <span className="text-sm font-bold text-yellow-400">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'Starter', price: '$500', sub: '$15/mo', features: ['Core Telemetry', 'Alerts', 'Mobile App'], color: 'border-blue-500/20' },
          { name: 'Pro AI', price: '$450*', sub: '$35/mo', features: ['Predictive Alerts', 'Custom Reports', 'API Access'], color: 'border-indigo-500 shadow-lg shadow-indigo-900/20' },
          { name: 'Enterprise', price: 'Custom', sub: 'Volume', features: ['On-Prem Cloud', 'Dedicated Support', 'SSO Login'], color: 'border-emerald-500/20' }
        ].map((tier, i) => (
          <div key={i} className={`bg-gray-900 border rounded-2xl p-5 flex flex-col ${tier.color} transition-transform hover:scale-105`}>
            <div className="mb-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{tier.name}</span>
              <div className="flex items-baseline space-x-1 mt-1">
                <span className="text-2xl font-black text-white">{tier.price}</span>
                <span className="text-[10px] text-gray-500">/node</span>
              </div>
              <p className="text-xs font-bold text-blue-400 mt-1">{tier.sub}</p>
            </div>
            <div className="flex-1 space-y-2 mb-4">
              {tier.features.map((f, j) => (
                <div key={j} className="flex items-center space-x-2">
                  <div className="text-blue-500"><Icons.Check /></div>
                  <span className="text-[10px] text-gray-400">{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessVisualizer;
