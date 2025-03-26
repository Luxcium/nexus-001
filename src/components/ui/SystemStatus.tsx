'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { getSystemStatus, updateSystemStatus } from '@/app/actions/system';

type SystemStatus = {
  status: string;
  version: string;
  environment: string;
  timestamp: string;
};

export default function SystemStatus() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  // Fetch system status on component mount
  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      try {
        const result = await getSystemStatus();
        setStatus(result);
      } catch (error) {
        console.error('Failed to fetch status:', error);
        setMessage('Failed to retrieve system status');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatus();
  }, []);
  
  // Handle system status update
  const handleUpdateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const result = await updateSystemStatus(newStatus);
      if (result.success) {
        // Refresh the status data
        const updatedStatus = await getSystemStatus();
        setStatus(updatedStatus);
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      setMessage('Failed to update system status');
    } finally {
      setUpdating(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Current system operational status</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading system status...</p>
        ) : status ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status.status === 'operational' 
                  ? 'bg-green-100 text-green-800' 
                  : status.status === 'maintenance'
                  ? 'bg-blue-100 text-blue-800'
                  : status.status === 'degraded'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {status.status.toUpperCase()}
              </span>
            </div>
            <p><span className="font-semibold">Version:</span> {status.version}</p>
            <p><span className="font-semibold">Environment:</span> {status.environment}</p>
            <p><span className="font-semibold">Last Updated:</span> {new Date(status.timestamp).toLocaleString()}</p>
          </div>
        ) : (
          <p>No status information available</p>
        )}
        
        {message && (
          <div className={`mt-4 p-2 rounded ${
            message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
        <Button 
          onClick={() => handleUpdateStatus('operational')} 
          disabled={loading || updating || status?.status === 'operational'}
          variant="outline"
          className="bg-green-50 hover:bg-green-100 text-green-700"
        >
          Set Operational
        </Button>
        <Button 
          onClick={() => handleUpdateStatus('maintenance')} 
          disabled={loading || updating || status?.status === 'maintenance'}
          variant="outline"
          className="bg-blue-50 hover:bg-blue-100 text-blue-700"
        >
          Set Maintenance
        </Button>
        <Button 
          onClick={() => handleUpdateStatus('degraded')} 
          disabled={loading || updating || status?.status === 'degraded'} 
          variant="outline"
          className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700"
        >
          Set Degraded
        </Button>
      </CardFooter>
    </Card>
  );
}