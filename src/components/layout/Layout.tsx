import { type LayoutProps } from "@/types/layout";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem-3rem)] p-6">
          <div className="h-full rounded-xl border border-black/[.1] dark:border-white/[.1] bg-card p-6">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
