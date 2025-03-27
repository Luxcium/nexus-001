import { type LayoutProps } from "@/types/layout";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { TopNav } from "../TopNav";

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <TopNav className="border-t-0" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-8rem-3rem)] p-6">
          <div className="container mx-auto pt-10">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
