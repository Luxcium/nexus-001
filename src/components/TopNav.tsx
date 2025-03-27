'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";

interface NavbarItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export function NavbarItem({ 
  children, 
  isActive, 
  className 
}: NavbarItemProps) {
  return (
    <li
      data-active={isActive}
      className={cn(
        "px-1 py-1.5",
        className
      )}
    >
      {children}
    </li>
  );
}

interface NavbarProps {
  className?: string;
  children?: React.ReactNode;
}

export function Navbar({ 
  className, 
  children 
}: NavbarProps) {
  return (
    <nav className={cn("bg-background border-b", className)}>
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-2">
          {children}
        </ul>
      </div>
    </nav>
  );
}

interface TopNavProps {
  className?: string;
}

export function TopNav({ className }: TopNavProps) {
  const routes = [
    { href: "/", label: "Dashboard" },
    { href: "/lists", label: "Lists" },
    { href: "/messages", label: "Messages" },
    { href: "/system/ports", label: "System Ports" },
  ];
  
  return (
    <Navbar className={className}>
      {routes.map((route) => (
        <NavbarItem 
          key={route.href}
          className="data-[active=true]:border-b-2 data-[active=true]:border-yellow-200 data-[active=true]:text-yellow-200"
        >
          <NavLink 
            href={route.href}
            className="px-4 py-2 text-sm font-medium hover:text-yellow-100 transition-colors"
          >
            {route.label}
          </NavLink>
        </NavbarItem>
      ))}
    </Navbar>
  );
}