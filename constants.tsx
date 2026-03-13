
import React from 'react';
import { SectionContent } from './types';

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
  Layout: <IconWrapper><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></IconWrapper>,
  Workflow: <IconWrapper><path d="M22 12a10 10 0 1 1-10-10" /><path d="M22 2L12 12" /></IconWrapper>,
  Zap: <IconWrapper><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></IconWrapper>,
  Database: <IconWrapper><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></IconWrapper>,
  Smartphone: <IconWrapper><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></IconWrapper>,
  Monitor: <IconWrapper><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></IconWrapper>,
  Bell: <IconWrapper><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></IconWrapper>,
  Wrench: <IconWrapper><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></IconWrapper>,
  TrendingUp: <IconWrapper><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></IconWrapper>,
  Briefcase: <IconWrapper><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></IconWrapper>,
  Sparkles: <IconWrapper><path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z" /></IconWrapper>
};

export const INDUSMART_SECTIONS: SectionContent[] = [
  {
    id: 'architecture',
    title: '1. System Architecture',
    icon: Icons.Layout,
    content: ['Designing a 4-layer stack for high scalability.'],
    subsections: [
      { title: 'Hardware Layer', body: 'Industrial sensors (Voltage/Current, Thermocouples, Accelerometers) connected to Edge Gateways (ESP32/Industrial PC).' },
      { title: 'Communication Layer', body: 'MQTT Protocol for real-time telemetry and 4G/WiFi for internet connectivity.' },
      { title: 'Cloud Layer', body: 'AWS/Azure environment hosting Node.js APIs, MongoDB for persistent storage, and Redis for caching.' },
      { title: 'Application Layer', body: 'React-based Web Admin Dashboard and Cross-platform Mobile App for field engineers.' }
    ]
  },
  {
    id: 'data-flow',
    title: '2. Data Flow Explanation',
    icon: Icons.Workflow,
    content: ['Step-by-step lifecycle of a sensor reading.'],
    subsections: [
      { title: 'Step 1: Collection', body: 'Sensors measure physical parameters like current and vibration 100 times per second.' },
      { title: 'Step 2: Processing', body: 'Edge Gateway aggregates data, calculates RMS values, and checks for immediate critical failures.' },
      { title: 'Step 3: Transmission', body: 'Compressed JSON packets are published to an MQTT Broker topic (e.g., "factory/machine1/telemetry").' },
      { title: 'Step 4: Storage & Alert', body: 'Cloud backend subscribes to topics, saves data to MongoDB, and triggers push notifications if limits are exceeded.' }
    ]
  },
  {
    id: 'protocol',
    title: '3. Communication Design',
    icon: Icons.Zap,
    content: ['Modern protocols for robust connectivity.'],
    subsections: [
      { title: 'MQTT Architecture', body: 'Primary choice. Publish/Subscribe model. Extremely lightweight for unstable factory networks.' },
      { title: 'HTTP REST Alternative', body: 'Used for non-realtime tasks like user login, machine configuration, and history retrieval.' },
      { title: 'Sample JSON Data', body: '`{ "m_id": "CNC-01", "p": 4500, "v": 230, "c": 19.5, "t": 65, "vib": 0.23, "ts": 1715432100 }`' }
    ]
  },
  {
    id: 'backend',
    title: '4. Backend Design',
    icon: Icons.Database,
    content: ['Scalable tech stack details.'],
    subsections: [
      { title: 'Tech Stack', body: 'Node.js (Runtime), Express (Framework), MongoDB (Database), Socket.io (Real-time events).' },
      { title: 'Database Schema', body: 'Collections: Users (Auth), Machines (Metadata), Telemetry (Time-series data), Alerts (Logs).' },
      { title: 'API Endpoints', body: 'GET /api/v1/machines (List machines), GET /api/v1/history/:id (View trends), POST /api/v1/alerts/ack (Acknowledge alert).' }
    ]
  },
  {
    id: 'mobile',
    title: '5. Mobile App Design',
    icon: Icons.Smartphone,
    content: ['User-centric mobile interface for maintenance staff.'],
    subsections: [] 
  },
  {
    id: 'admin',
    title: '6. Web Admin Features',
    icon: Icons.Monitor,
    content: ['Comprehensive factory management.'],
    subsections: [
      { title: 'Device Provisioning', body: 'Onboard new sensors via QR code scanning for rapid deployment.' },
      { title: 'Reporting', body: 'Generate weekly CSV/PDF energy efficiency reports with detailed AI-driven optimization metrics.' }
    ]
  },
  {
    id: 'alerts',
    title: '7. Alert System Logic',
    icon: Icons.Bell,
    content: ['Multi-level severity alerting.'],
    subsections: [] // Removed 'Threshold-based' and 'Methods' text as requested
  },
  {
    id: 'implementation',
    title: '8. Implementation Guide',
    icon: Icons.Wrench,
    content: ['Roadmap from prototype to production.'],
    subsections: [
      { title: 'Phase 1: Prototyping', body: 'Use ESP32 and breadboard sensors to test data transmission to local MQTT broker.' },
      { title: 'Phase 2: MVP', body: 'Build the cloud backend and basic React dashboard for one test machine.' },
      { title: 'Phase 3: Scaling', body: 'Deploy custom PCB hardware and stress test server for 100+ machines.' }
    ]
  },
  {
    id: 'business',
    title: '9. Business Model',
    icon: Icons.TrendingUp,
    content: ['Monetization strategy.'],
    subsections: [
      { title: 'Revenue Streams', body: ['Hardware Sales: High-margin industrial IoT nodes (One-time).', 'SaaS Subscriptions: Monthly recurring revenue (MRR) for cloud analytics.', 'Premium Support: SLA-based maintenance contracts.', 'AI Add-ons: Advanced predictive maintenance models as a bolt-on feature.'] },
      { title: 'Pricing Strategy', body: ['Starter: $500 per node + $15/mo basic monitoring.', 'Professional: $450 per node (bulk) + $35/mo with AI diagnostics.', 'Enterprise: Custom volume pricing with on-premise cloud options.'] },
      { title: 'Target Customers', body: ['Textile & Garment: High energy consumption monitoring.', 'Food Processing: Critical temperature and motor health.', 'Precision Engineering: High-frequency vibration monitoring for CNC.', 'Warehousing: Environmental monitoring and HVAC efficiency.'] }
    ]
  },
  {
    id: 'investor',
    title: '10. Investor Evaluation',
    icon: Icons.Briefcase,
    content: ['Why InduSmart will succeed.'],
    subsections: [
      { title: 'Core Strengths', body: ['Hyper-Scalable: MQTT-first architecture allows 10k+ nodes on minimal infrastructure.', 'Rapid ROI: Factories typically see 15-20% energy savings in 6 months.', 'Proprietary Edge: Lightweight edge algorithms reduce cloud costs by 80%.'] },
      { title: 'Go-To-Market Strategy', body: ['Distributor Channel: Partnering with industrial electrical equipment sellers.', 'The "Hook": Offer a free 30-day trial on the least efficient machine.', 'Content Authority: Whitepapers on "Transitioning to Industry 4.0".'] }
    ]
  },
  {
    id: 'future',
    title: '11. Future Upgrades',
    icon: Icons.Sparkles,
    content: ['The roadmap to Industry 4.0.'],
    subsections: [
      { title: 'AI Maintenance', body: 'Use Machine Learning to predict failures 48 hours before they happen.' },
      { title: 'Carbon Tracking', body: 'Automatic calculation of carbon footprint based on energy sources.' }
    ]
  }
];
