import { type FooterProps } from "@/types/layout";

export default function Footer({ version = "0.1.0" }: Readonly<FooterProps>) {
  return (
    <footer className="h-12 border-t border-black/[.1] dark:border-white/[.1] px-4 flex items-center justify-between bg-background text-sm text-foreground/70">
      <div>
        {/* Left section - Status or info */}
        <span>Nexus GUI v{version}</span>
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
