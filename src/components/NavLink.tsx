'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

interface NavLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'isActive'> {
  /**
   * Whether the link should be highlighted as active
   * If not provided, it will be determined automatically based on the current pathname
   */
  isActive?: boolean;
  /**
   * Additional class names to apply when the link is active
   */
  activeClassName?: string;
  /**
   * Determines if the link should be active when the pathname starts with the href
   * Useful for section navigation where child routes should highlight parent nav items
   */
  activeOnParent?: boolean;
}

/**
 * A navigation link component that automatically determines if it's active based on the current pathname
 * and adds appropriate styling and data-active attribute for Tailwind targeting
 */
const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ 
    children, 
    href, 
    className, 
    isActive: isActiveProp, 
    activeClassName = "",
    activeOnParent = false,
    ...props 
  }, ref) => {
    const pathname = usePathname();
    // If isActive is explicitly provided, use that, otherwise determine based on current path
    const isActive = isActiveProp !== undefined 
      ? isActiveProp 
      : typeof href === 'string' && (
          activeOnParent 
            ? pathname.startsWith(href) && href !== '/' // prevent '/' from matching everything
            : pathname === href
        );

    // We don't need to filter props since we're using the Omit type above
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          className,
          isActive && activeClassName
        )}
        data-active={isActive}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = 'NavLink';
export { NavLink };