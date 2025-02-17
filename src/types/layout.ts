import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  title?: string;
}

export interface SidebarProps {
  initialOpen?: boolean;
}

export interface FooterProps {
  version?: string;
}
