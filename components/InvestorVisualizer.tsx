
import React from 'react';

const Icons = {
  Zap: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Target: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Shield: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
};

const InvestorVisualizer: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-700">
      {/* High Impact Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-900/40 to-black p-6 rounded-3xl border border-indigo-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icons.Zap />
          </div>
          <div className="relative z-10">
            <h4 className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-4">Competitive Moat</h4>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-black text-white">80%</p>
                <p className="text-xs text-gray-500">Reduction in Cloud Overhead vs Competitors</p>
              </div>
              <div className="h-px bg-gray-800" />
              <div>
                <p className="text-2xl font-black text-white">6 Months</p>
                <p className="text-xs text-gray-500">Average Payback Period for Factory Owners</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/40 to-black p-6 rounded-3xl border border-emerald-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icons.Shield />
          </div>
          <div className="relative z-10">
            <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4">Risk Mitigation</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <span className="text-sm font-bold text-gray-300">Non-Intrusive Installation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <span className="text-sm font-bold text-gray-300">Offline-First Edge Logic</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <span className="text-sm font-bold text-gray-300">SOC2 Compliant Cloud Pipeline</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Roadmap */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 relative">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-900/40">
            <Icons.Target />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Execution Velocity</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Go-To-Market Pillars</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/40 p-5 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all">
            <div className="text-2xl mb-2">🤝</div>
            <h5 className="font-bold text-white text-sm mb-1">Partnerships</h5>
            <p className="text-[10px] text-gray-500">Collaborating with industrial PLC distributors to embed InduSmart at source.</p>
          </div>
          <div className="bg-black/40 p-5 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all">
            <div className="text-2xl mb-2">🧪</div>
            <h5 className="font-bold text-white text-sm mb-1">Pilot Programs</h5>
            <p className="text-[10px] text-gray-500">"One machine free for 30 days" - High conversion from demo to full rollout.</p>
          </div>
          <div className="bg-black/40 p-5 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all">
            <div className="text-2xl mb-2">🎓</div>
            <h5 className="font-bold text-white text-sm mb-1">Thought Leadership</h5>
            <p className="text-[10px] text-gray-500">Leading the "SME Industry 4.0" discourse via technical whitepapers.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <div className="h-px bg-gray-800 w-12" />
        <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">Scalability Focused</span>
        <div className="h-px bg-gray-800 w-12" />
      </div>
    </div>
  );
};

export default InvestorVisualizer;
