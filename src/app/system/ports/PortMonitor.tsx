'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPortsInUse, PortInfo } from '@/app/actions/ports';

interface PortMonitorProps {
  initialPorts: PortInfo[];
  initialError?: string;
}

export function PortMonitor({ initialPorts, initialError }: PortMonitorProps) {
  const [ports, setPorts] = useState<PortInfo[]>(initialPorts);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(initialError);

  // Client-side refresh function using the server action
  const refreshPorts = async () => {
    try {
      setLoading(true);
      const { ports: freshPorts, error: freshError } = await getPortsInUse();
      setPorts(freshPorts);
      setError(freshError);
    } catch (err) {
      setError('Failed to refresh port information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Group ports by range
  const portGroups = {
    'Web Ports': ports.filter(port => port.port === 80 || port.port === 8080),
    'Development Ports (3000-3999)': ports.filter(port => port.port >= 3000 && port.port <= 3999),
    'Application Ports (5000-5999)': ports.filter(port => port.port >= 5000 && port.port <= 5999),
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Active Ports</h2>
        <Button 
          onClick={refreshPorts} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 border-t-2 border-b-2 rounded-full animate-spin"></div>
              <span>Refreshing...</span>
            </>
          ) : (
            <span>Refresh Ports</span>
          )}
        </Button>
      </div>

      {error ? (
        <Card className="border-red-500 mb-6">
          <CardContent className="pt-6">
            <div className="text-red-500">{error}</div>
            <p className="mt-2 text-sm">This feature requires server-side command execution and may not work properly in all environments.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6">
            {ports.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p>No ports found in the specified ranges.</p>
                </CardContent>
              </Card>
            ) : (
              Object.entries(portGroups).map(([groupName, groupPorts]) => (
                groupPorts.length > 0 && (
                  <div key={groupName} className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">{groupName}</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {groupPorts.map((port) => (
                        <Card key={port.port} className="overflow-hidden">
                          <CardHeader className="bg-muted/50">
                            <CardTitle>Port {port.port}</CardTitle>
                            <CardDescription>{port.protocol}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="space-y-2">
                              <div>
                                <span className="font-semibold">Process:</span> {port.processName}
                              </div>
                              <div>
                                <span className="font-semibold">PID:</span> {port.pid}
                              </div>
                              <div>
                                <span className="font-semibold">Description:</span> {port.description}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="bg-muted/20 flex justify-between">
                            <span className="text-xs text-muted-foreground">
                              {port.port === 80 || port.port === 8080 ? 'Web Service' : 'Application Service'}
                            </span>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              ))
            )}
          </div>
        </>
      )}

      {/* Information section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>About Common Ports</CardTitle>
          <CardDescription>Understanding standard port usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Ports are virtual points where network connections start and end. They help computers sort different kinds of traffic.</p>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Common Web Ports</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>80</strong> - Standard HTTP port for websites</li>
                <li><strong>8080</strong> - Alternative HTTP port, commonly used for web development</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Development Ports (3000-3999)</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>3000</strong> - Default for React, Node.js development servers</li>
                <li><strong>3001</strong> - Alternative development server port</li>
                <li><strong>3306</strong> - MySQL database server</li>
                <li><strong>3307</strong> - Alternative MySQL port</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Application Ports (5000-5999)</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>5000</strong> - Flask/Python development servers</li>
                <li><strong>5432</strong> - PostgreSQL database</li>
                <li><strong>5900-5999</strong> - VNC remote access</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}