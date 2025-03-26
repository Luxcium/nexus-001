import { Metadata } from "next";
import SystemStatus from "@/components/ui/SystemStatus";
import UserSettings from "@/components/ui/UserSettings";
import FeedbackForm from "@/components/ui/FeedbackForm";

export const metadata: Metadata = {
  title: "Server Actions Demo | Nexus GUI",
  description: "Demonstration of Next.js server actions",
};

export default function ActionsDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Server Actions Demo</h1>
        <p className="text-muted-foreground mb-6">
          This page demonstrates Next.js 14+ server actions with client components.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <SystemStatus />
        </div>
        
        <div>
          <UserSettings />
        </div>
        
        <div>
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}