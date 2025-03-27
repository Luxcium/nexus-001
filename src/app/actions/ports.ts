'use server';

import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Define types for port information
export interface PortInfo {
  port: number;
  protocol: string;
  processName: string;
  pid: string;
  description: string;
}

// Common port descriptions for reference
const commonPortDescriptions: Record<number, string> = {
  80: 'HTTP - Standard web server port',
  3000: 'Common development server port (React, Node.js)',
  3001: 'Alternative development server port',
  3306: 'MySQL database server',
  3307: 'Alternative MySQL port',
  5000: 'Flask/Python development server',
  5432: 'PostgreSQL database server',
  8080: 'Alternative HTTP port, often used for development servers',
};

/**
 * Check if required system commands are available
 */
async function checkSystemRequirements(): Promise<{ available: boolean; missing: string[] }> {
  const requiredCommands = ['ss', 'lsof', 'grep'];
  const missing: string[] = [];
  
  for (const cmd of requiredCommands) {
    try {
      await execPromise(`which ${cmd}`);
    } catch   {
      missing.push(cmd);
    }
  }
  return {
    available: missing.length === 0,
    missing
  };
}

/**
 * Server action to get ports in use within specified ranges
 * Targets ports 3000-3999, 5000-5999, 8080, and 80
 */
export async function getPortsInUse(): Promise<{ ports: PortInfo[]; error?: string }> {
  try {
    // Check if required commands are available
    const { available, missing } = await checkSystemRequirements();
    if (!available) {
      return { 
        ports: [],
        error: `Missing required system commands: ${missing.join(', ')}. Please install these tools to use port monitoring.`
      };
    }
    
    // Command to list all listening TCP ports with process info - more robust version
    const { stdout } = await execPromise('ss -tuln | grep -E ":(3[0-9]{3}|5[0-9]{3}|8080|80)[[:space:]]"').catch(() => {
      // If the specific grep pattern fails, try a more general approach
      return execPromise('ss -tuln');
    });
    
    if (!stdout || stdout.trim() === '') {
      return { ports: [], error: undefined }; // No ports found, but not an error
    }
    
    // Parse the output and create port info objects
    const portInfos: PortInfo[] = [];
    const lines = stdout.trim().split('\n');
    
    for (const line of lines) {
      // More robust regex that works across different ss output formats
      const match = line.match(/:(\d+)\s/) || line.match(/[^:]:(\d+)$/);
      if (match) {
        const port = parseInt(match[1], 10);
        
        // Skip ports outside our target ranges
        if (!(
          (port >= 3000 && port <= 3999) || 
          (port >= 5000 && port <= 5999) || 
          port === 8080 || 
          port === 80
        )) {
          continue;
        }
        
        // Get process info for this port with better error handling
        let processName = 'Unknown';
        let pid = 'Unknown';
        
        try {
          const { stdout: processInfo } = await execPromise(`lsof -i :${port} | tail -n 1`);
          if (processInfo && processInfo.trim()) {
            const processMatch = processInfo.match(/\S+\s+(\d+)\s+(\S+)/);
            if (processMatch) {
              pid = processMatch[1];
              processName = processMatch[2];
            }
          }
        } catch (err) {
          // Silently handle process info errors - we'll just use the defaults
          console.warn(`Could not get process info for port ${port}: ${err}`);
        }
        
        portInfos.push({
          port,
          protocol: line.toLowerCase().includes('tcp') ? 'TCP' : 'UDP',
          processName,
          pid,
          description: commonPortDescriptions[port] || 'Custom application'
        });
      }
    }
    
    return { ports: portInfos };
  } catch (error) {
    console.error('Error fetching ports in use:', error);
    return { 
      ports: [],
      error: error instanceof Error 
        ? `Error scanning ports: ${error.message}` 
        : 'Unknown error occurred while scanning ports'
    };
  }
}