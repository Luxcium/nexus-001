import { PortMonitor } from '@/app/system/ports/PortMonitor';
import { getPortsInUse } from '@/app/actions/ports';

export const metadata = {
  title: 'System Ports Monitor',
  description: 'Monitor and analyze ports in use on your system',
};

export default async function PortsPage() {
  // Fetch port information server-side using the server action
  const { ports, error } = await getPortsInUse();
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">System Ports Monitor</h1>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          This page displays all ports in use on your system within the ranges 3000-3999, 5000-5999, 
          as well as the common web ports 80 and 8080.
        </p>
      </div>

      {/* Pass the server-fetched data to the client component */}
      <PortMonitor initialPorts={ports} initialError={error} />
    </div>
  );
}