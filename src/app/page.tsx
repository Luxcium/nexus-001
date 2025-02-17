export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-bold">Welcome to Nexus GUI</h1>
      <p className="text-xl text-foreground/70 max-w-[600px]">
        A personal project interface to integrate and manage various GUI applications.
        Select a project from the sidebar to get started.
      </p>
      <div className="mt-4 font-mono text-sm text-foreground/50">
        Ready for development • Version 0.1.0
      </div>
    </div>
  );
}
