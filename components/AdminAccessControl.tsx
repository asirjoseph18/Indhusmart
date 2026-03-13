
import React, { useState } from 'react';

// Updated IconWrapper props type to make children optional, ensuring JSX children are correctly accepted by the compiler
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
  Shield: <IconWrapper className="w-6 h-6 text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></IconWrapper>,
  Lock: <IconWrapper className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></IconWrapper>,
  UserCheck: <IconWrapper className="w-5 h-5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></IconWrapper>
};

const AdminAccessControl: React.FC = () => {
  const [roleInput, setRoleInput] = useState('');
  const [accessStatus, setAccessStatus] = useState<null | 'granted' | 'denied'>(null);

  const validRoles = ['admin', 'manager', 'operator'];

  const handleCheckAccess = () => {
    if (validRoles.includes(roleInput.toLowerCase().trim())) {
      setAccessStatus('granted');
    } else {
      setAccessStatus('denied');
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          {Icons.Shield}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">RBAC Access Simulator</h3>
          <p className="text-xs text-gray-500">Role-Based Access Control System</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Enter User Role
          </label>
          <div className="relative">
            <input
              type="text"
              value={roleInput}
              onChange={(e) => {
                setRoleInput(e.target.value);
                setAccessStatus(null);
              }}
              placeholder="e.g., Admin, Manager, Operator"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleCheckAccess}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/20"
        >
          {Icons.Lock}
          <span>Verify Permission</span>
        </button>

        {accessStatus === 'granted' && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center space-x-3 animate-in fade-in zoom-in duration-300">
            <div className="p-1 bg-green-500 rounded-full text-white">
              {Icons.UserCheck}
            </div>
            <div>
              <p className="text-green-400 font-bold text-sm uppercase">Access Granted</p>
              <p className="text-green-500/80 text-xs">Identity verified. Welcome, {roleInput}.</p>
            </div>
          </div>
        )}

        {accessStatus === 'denied' && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center space-x-3 animate-in fade-in zoom-in duration-300">
            <div className="p-1 bg-red-500 rounded-full text-white">
              <IconWrapper className="w-5 h-5"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></IconWrapper>
            </div>
            <div>
              <p className="text-red-400 font-bold text-sm uppercase">Access Denied</p>
              <p className="text-red-500/80 text-xs">Invalid role. Please try Admin, Manager, or Operator.</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-800">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">System Log</p>
        <div className="mt-2 font-mono text-[10px] text-gray-500 space-y-1">
          <p>[{new Date().toLocaleTimeString()}] Waiting for authentication...</p>
          {accessStatus && (
            <p className={accessStatus === 'granted' ? 'text-green-500' : 'text-red-500'}>
              [{new Date().toLocaleTimeString()}] Auth result: {accessStatus.toUpperCase()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAccessControl;
