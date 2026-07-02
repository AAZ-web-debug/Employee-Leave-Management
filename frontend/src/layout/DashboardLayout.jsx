import { useState } from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#05070b] text-white flex">
      {/* Background Glow Effects */}

      <div className="absolute inset-0 pointer-events-none">
        {/* Top Right Glow */}

        <div
          className="
          absolute
          top-[-250px]
          right-[-250px]
          w-[700px]
          h-[700px]
          rounded-full
          bg-blue-500/10
          blur-[180px]
        "
        />

        {/* Bottom Left Glow */}

        <div
          className="
          absolute
          bottom-[-250px]
          left-[-250px]
          w-[650px]
          h-[650px]
          rounded-full
          bg-violet-500/10
          blur-[180px]
        "
        />

        {/* Center Glow */}

        <div
          className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[900px]
          h-[900px]
          rounded-full
          bg-white/[0.02]
          blur-[220px]
        "
        />
      </div>

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
  className={`relative flex-1 transition-all duration-300 ${
    collapsed
      ? "ml-20"
      : "ml-60"
  }`}
>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;