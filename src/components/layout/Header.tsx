import { type HeaderProps } from "@/types/layout";

export default function Header({ title = "Nexus GUI" }: Readonly<HeaderProps>) {
  return (
    <header className="h-16 border-b border-black/[.1] dark:border-white/[.1] px-4 flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        {/* Logo/Brand */}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Placeholder for future header actions */}
      </div>
    </header>
  );
}
