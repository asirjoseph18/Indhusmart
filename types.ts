// Added React import to provide the React namespace for types like ReactNode
import React from 'react';

export interface SectionContent {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string[];
  subsections?: { title: string; body: string | string[] }[];
}

export interface MachineData {
  timestamp: string;
  power: number;
  voltage: number;
  current: number;
  temp: number;
  vibration: number;
}