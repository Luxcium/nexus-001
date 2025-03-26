'use client';

import { useState, useEffect } from 'react';
import { type FooterProps } from "@/types/layout";
import { getSystemStatus } from "@/app/actions/system";

export default function Footer({ version = "0.1.0" }: Readonly<FooterProps>) {
  const [systemVersion, setSystemVersion] = useState(version);
  const [systemStatus, setSystemStatus] = useState<string | null>(null);
  
  // Fetch system status on component mount
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const status = await getSystemStatus();
        setSystemVersion(status.version);
        setSystemStatus(status.status);
      } catch (error) {
        console.error('Failed to fetch system status:', error);
      }
    };
    
    fetchSystemInfo();
  }, []);

  return (
    <footer className="h-12 border-t border-black/[.1] dark:border-white/[.1] px-4 flex items-center justify-between bg-background text-sm text-foreground/70">
      <div className="flex items-center space-x-3">
        {/* Left section - Status and version info */}
        <span>Nexus GUI v{systemVersion}</span>
        {systemStatus && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            systemStatus === 'operational' 
              ? 'bg-green-100 text-green-800' 
              : systemStatus === 'maintenance'
              ? 'bg-blue-100 text-blue-800'
              : systemStatus === 'degraded'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {systemStatus.toUpperCase()}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Right section - Links or additional info */}
        <span className="text-xs">
          {new Date().getFullYear()} • Personal Project GUI Interface
        </span>
      </div>
    </footer>
  );
}
