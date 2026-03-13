
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPreview from './components/DashboardPreview';
import AdminAccessControl from './components/AdminAccessControl';
import WebAdminTools from './components/WebAdminTools';
import MobileAppPreview from './components/MobileAppPreview';
import MQTTVisualizer from './components/MQTTVisualizer';
import RESTVisualizer from './components/RESTVisualizer';
import JSONDataViewer from './components/JSONDataViewer';
import BackendArchitecture from './components/BackendArchitecture';
import DataFlowVisualizer from './components/DataFlowVisualizer';
import ImplementationRoadmap from './components/ImplementationRoadmap';
import BusinessVisualizer from './components/BusinessVisualizer';
import InvestorVisualizer from './components/InvestorVisualizer';
import AIUpgradeVisualizer from './components/AIUpgradeVisualizer';
import CarbonTrackerVisualizer from './components/CarbonTrackerVisualizer';
import AlertSystemVisualizer from './components/AlertSystemVisualizer';
import { INDUSMART_SECTIONS } from './constants';

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
  ChevronRight: <IconWrapper className="w-5 h-5 text-blue-500 mr-2"><polyline points="9 18 15 12 9 6" /></IconWrapper>,
};

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState(INDUSMART_SECTIONS[0].id);

  const activeSection = INDUSMART_SECTIONS.find(s => s.id === activeSectionId)!;

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden text-gray-100 font-sans">
      <Sidebar 
        activeSection={activeSectionId} 
        onSectionSelect={setActiveSectionId} 
      />

      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-950">
        <div className="max-w-4xl mx-auto pb-20">
          {/* Header */}
          <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
            <div className="flex items-center space-x-2 text-blue-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">Project Proposal</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">
              {activeSection.title}
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </div>

          <div className="space-y-8">
            {/* Contextual Visualizers */}
            {activeSection.id === 'architecture' && (
              <div className="bg-gray-900 p-1 rounded-xl border border-gray-800 mb-6 shadow-2xl">
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
                  <span className="text-xs text-gray-500 font-mono uppercase tracking-tighter">Live Simulation Layer</span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-green-500 font-bold uppercase">System Active</span>
                  </span>
                </div>
                <DashboardPreview />
              </div>
            )}

            {activeSection.id === 'data-flow' && (
              <div className="mb-6">
                <DataFlowVisualizer />
              </div>
            )}

            {activeSection.id === 'protocol' && (
              <div className="mb-6 space-y-6">
                <MQTTVisualizer />
                <RESTVisualizer />
                <JSONDataViewer />
              </div>
            )}

            {activeSection.id === 'backend' && (
              <div className="mb-6">
                <BackendArchitecture />
              </div>
            )}

            {activeSection.id === 'admin' && (
              <div className="mb-6 space-y-6">
                <AdminAccessControl />
                <WebAdminTools />
              </div>
            )}

            {activeSection.id === 'mobile' && (
              <div className="mb-6 bg-gray-900/30 rounded-3xl border border-gray-800 p-4 shadow-inner">
                <div className="text-center mb-6">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Interactive Prototype</span>
                  <p className="text-xs text-gray-500">Use PIN "1234" or tap Fingerprint</p>
                </div>
                <MobileAppPreview />
              </div>
            )}

            {activeSection.id === 'alerts' && (
              <div className="mb-6">
                <AlertSystemVisualizer />
              </div>
            )}

            {activeSection.id === 'implementation' && (
              <div className="mb-6">
                <ImplementationRoadmap />
              </div>
            )}

            {activeSection.id === 'business' && (
              <div className="mb-6">
                <BusinessVisualizer />
              </div>
            )}

            {activeSection.id === 'investor' && (
              <div className="mb-6">
                <InvestorVisualizer />
              </div>
            )}

            {activeSection.id === 'future' && (
              <div className="mb-6 space-y-6">
                <AIUpgradeVisualizer />
                <CarbonTrackerVisualizer />
              </div>
            )}

            {/* Subsections Textual Content */}
            <section className="space-y-6">
              {activeSection.subsections?.map((sub, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 transition-all hover:border-gray-700 hover:bg-gray-900">
                  <h4 className="text-lg font-bold text-gray-200 mb-3 flex items-center">
                    {Icons.ChevronRight}
                    {sub.title}
                  </h4>
                  {Array.isArray(sub.body) ? (
                    <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
                      {sub.body.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm leading-relaxed">{sub.body}</p>
                  )}
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
