import {
  Users,
  FileText,
  CheckCircle2,
  Shield,
  UserCircle,
  Paperclip,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";


const features = [
  {
    icon: <Users size={24} />,
    title: "Employee Management",
    description:
      "Manage employee records, profiles and workforce information.",
  },
  {
    icon: <FileText size={24} />,
    title: "Leave Applications",
    description:
      "Submit, track and manage leave requests effortlessly.",
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "Approval Workflow",
    description:
      "Managers can review, approve and reject leave requests.",
  },
  {
    icon: <Shield size={24} />,
    title: "Leave Balance Tracking",
    description:
      "Automatic leave balance updates after approval.",
  },
  {
    icon: <UserCircle size={24} />,
    title: "Profile Management",
    description:
      "Update profile information, passwords and photos.",
  },
  {
    icon: <Paperclip size={24} />,
    title: "Document Attachments",
    description:
      "Upload supporting documents with leave requests.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
useEffect(() => {
  fetchStats();
}, []);

const fetchStats = async () => {
  try {
    const response =
  await api.get("/dashboard/public-stats");

console.log("LANDING STATS:", response.data);

    setStats(response.data.data);
  } catch (error) {
  console.error("LANDING ERROR:", error);
}
};

  const scrollToFeatures = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-white overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-[#090b10]/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="font-bold text-xl">
            ELMS
          </h1>

          <button
            onClick={() =>
              navigate("/login")
            }
            className="
px-6 py-3

rounded-2xl

border border-blue-500/10
bg-blue-500/[0.04]

backdrop-blur-xl

text-zinc-100

hover:bg-white/[0.06]
hover:border-white/15

transition-all
duration-300
"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>

            <h1 className="text-6xl font-bold leading-tight">
              Employee Leave
              <br />
              Management
              <br />
              System
            </h1>

            <p className="text-zinc-400 text-lg mt-6 max-w-xl">
              Streamline employee leave requests,
              approvals, leave tracking and
              workforce management through a
              centralized platform.
            </p>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() =>
                  navigate("/login")
                }
                className="
px-6 py-3

rounded-2xl

border border-blue-500/10
bg-blue-500/[0.04]

backdrop-blur-xl

text-zinc-100

hover:bg-white/[0.06]
hover:border-white/15

transition-all
duration-300
"
              >
                Login
              </button>

              <button
                onClick={scrollToFeatures}
                className="
                  px-6 py-3
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition
                "
              >
                Explore Features
              </button>
            </div>
          </div>

          {/* Mock Dashboard Card */}
          <div>
            <div
              className="
                rounded-3xl
                border border-white/10
                bg-[#12161d]
                backdrop-blur-xl
                p-10 min-h-[520px]
                shadow-[0_0_80px_rgba(255,255,255,0.03)]
              "
            >
              <h2 className="text-xl font-semibold mb-8">
                Platform Overview
              </h2>

              <div className="grid grid-cols-2 gap-6 mt-8">
  <div
    className="
  h-40
  rounded-3xl
  border border-white/10
  bg-white/[0.03]
  backdrop-blur-xl
  flex flex-col
  justify-center
  px-8
  transition-all
  duration-300
  hover:bg-white/[0.05]
  hover:border-blue-500/30
  hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
"
  >
    <p className="text-zinc-400 text-sm font-medium">
      Employees
    </p>

    <h3 className="mt-3 text-5xl font-bold tracking-tight text-white">
      {stats?.totalEmployees ?? 0}
    </h3>
  </div>

  <div
  className="
    h-40
    rounded-3xl
    border border-white/10
    bg-white/[0.03]
    backdrop-blur-xl
    flex flex-col
    justify-center
    px-8
    transition-all
    duration-300
    hover:bg-white/[0.05]
    hover:border-blue-500/30
    hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
  "
>
  <p className="text-zinc-400 text-sm font-medium">
    Leave Requests
  </p>

  <h3 className="mt-3 text-5xl font-bold tracking-tight text-white">
    {stats?.totalLeaveRequests ?? 0}
  </h3>
</div>

  <div
  className="
    h-40
    rounded-3xl
    border border-white/10
    bg-white/[0.03]
    backdrop-blur-xl
    flex flex-col
    justify-center
    px-8
    transition-all
    duration-300
    hover:bg-white/[0.05]
    hover:border-blue-500/30
    hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
  "
>
  <p className="text-zinc-400 text-sm font-medium">
    Approved
  </p>

  <h3 className="mt-3 text-5xl font-bold tracking-tight text-white">
    {stats?.approvedRequests ?? 0}
  </h3>
</div>

  <div
  className="
    h-40
    rounded-3xl
    border border-white/10
    bg-white/[0.03]
    backdrop-blur-xl
    flex
    flex-col
    justify-center
    px-8
    transition-all
    duration-300
    hover:bg-white/[0.05]
    hover:border-blue-500/30
    hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
  "
>
  <p className="text-zinc-400 text-sm font-medium">
    Pending
  </p>

  <h3 className="mt-3 text-5xl font-bold tracking-tight text-white">
    {stats?.pendingRequests ?? 0}
  </h3>
</div>
</div>
                  
              </div>
            </div>
          </div>
        
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">
            Features
          </h2>

          <p className="text-zinc-500 text-center mt-4">
            Everything needed to manage
            employee leave efficiently.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="
                  p-6
                  rounded-3xl
                  border border-white/10
                  bg-[#12161d]
                  hover:border-blue-500/30
                  hover:-translate-y-1
                  transition-all
                "
              >
                <div className="text-blue-400 mb-4">
                  {feature.icon}
                </div>

                <h3 className="font-semibold text-lg">
                  {feature.title}
                </h3>

                <p className="text-zinc-500 mt-3 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">
            Workflow
          </h2>

          <div className="grid md:grid-cols-5 gap-6 mt-16 text-center">
            {[
              "Employee",
              "Apply Leave",
              "Attach Documents",
              "Manager Review",
              "Approve / Reject",
            ].map((step) => (
              <div
                key={step}
                className="
                  p-6
                  rounded-2xl
                  border border-white/10
                  bg-[#12161d]
                "
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="
              rounded-3xl
              border border-white/10
              bg-[#12161d]
              p-12
              text-center
            "
          >
            <h2 className="text-4xl font-bold">
  Ready to simplify leave management?
</h2>

<p className="text-zinc-500 mt-4 max-w-2xl mx-auto">
  Centralized leave requests, approval workflows,
  employee management and document attachments
  in one platform.
</p>

<div className="flex flex-wrap justify-center gap-3 mt-8">
  <span
    className="
      px-4 py-2
      rounded-xl
      border border-white/10
      bg-white/[0.03]
      text-zinc-300
      text-sm
    "
  >
    Secure Authentication
  </span>

  <span
    className="
      px-4 py-2
      rounded-xl
      border border-white/10
      bg-white/[0.03]
      text-zinc-300
      text-sm
    "
  >
    Role-Based Access
  </span>

  <span
    className="
      px-4 py-2
      rounded-xl
      border border-white/10
      bg-white/[0.03]
      text-zinc-300
      text-sm
    "
  >
    Document Attachments
  </span>
</div>

            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-zinc-500">
        Employee Leave Management System
      </footer>
    </div>
  );
};

export default LandingPage;