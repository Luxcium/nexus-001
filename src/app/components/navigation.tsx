'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();
  
  const routes = [
    { path: '/', label: 'Dashboard' },
    { path: '/system/ports', label: 'System Ports' },
  ];
  
  return (
    <nav className="mb-6">
      <ul className="flex space-x-4">
        {routes.map(route => (
          <li key={route.path}>
            <Link 
              href={route.path}
              className={`px-4 py-2 rounded-md ${
                pathname === route.path 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
