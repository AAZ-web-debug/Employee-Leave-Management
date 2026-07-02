import { useEffect, useState } from "react";
import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import api from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";
import GlowBorderCard from "../components/GlowBorderCard";
import { useAuth } from "../context/AuthContext";

const StatItem = ({
  icon,
  label,
  value,
}) => (
  <div className="text-center flex flex-col items-center justify-center p-4">
    <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm font-medium tracking-wide uppercase">
      {icon}
      <span>{label}</span>
    </div>

    <h3 className="text-4xl font-bold mt-3 text-white tracking-tight">
      {value}
    </h3>
  </div>
);

const EmployeeDashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchLeaves();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get(
        "/dashboard/employee"
      );

      setStats(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await api.get(
        "/leaves/my"
      );

      console.log(
  "Employee Dashboard Leaves:",
  response.data
);

      setLeaves(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 min-h-screen text-zinc-100">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Welcome Back, {user?.name}
          </h1>

          <p className="text-zinc-500 mt-2 text-sm">
            Manage your leave requests
          </p>
        </div>

        {!stats ? (
          <div className="text-zinc-500 flex items-center justify-center py-20">
            <div className="animate-pulse">
              Loading dashboard...
            </div>
          </div>
        ) : (
          <GlowBorderCard>
            <div className="dashboard-beam absolute inset-0 bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 opacity-70" />

            <div
              className="
                relative
                w-full
                h-full
                overflow-hidden
                rounded-3xl
                border border-white/[0.08]
                bg-[#12161d]/95
                backdrop-blur-xl
                shadow-[0_0_80px_rgba(255,255,255,0.03)]
                p-6 sm:p-10
              "
            >
              <h2 className="text-xl font-semibold text-white">
                Overview
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <StatItem
                  icon={<FileText size={16} />}
                  label="Total"
                  value={stats.totalLeaves}
                />

                <StatItem
                  icon={
                    <Clock3
                      size={16}
                      className="text-yellow-500"
                    />
                  }
                  label="Pending"
                  value={stats.pendingLeaves}
                />

                <StatItem
                  icon={
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500"
                    />
                  }
                  label="Approved"
                  value={stats.approvedLeaves}
                />

                <StatItem
                  icon={
                    <XCircle
                      size={16}
                      className="text-red-500"
                    />
                  }
                  label="Rejected"
                  value={stats.rejectedLeaves}
                />
              </div>

              <div className="h-px w-full bg-white/[0.08] my-10" />

              <h2 className="text-xl font-semibold text-white mb-6">
                Recent Leave Requests
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-sm text-zinc-500">
                      <th className="text-left py-4 px-4">
                        Type
                      </th>

                      <th className="text-left py-4 px-4">
                        Duration
                      </th>

                      <th className="text-left py-4 px-4">
                        Days
                      </th>

                      <th className="text-left py-4 px-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {leaves.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-16 text-center text-zinc-500"
                        >
                          No leave requests found.
                        </td>
                      </tr>
                    ) : (
                      leaves.slice(0, 5).map((leave) => (
                        <tr
                          key={leave._id}
                          className="border-b border-white/[0.04]"
                        >
                          <td className="py-4 px-4 capitalize">
                            {leave.leaveType}
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1">
                              <span>
                                {new Date(
                                  leave.fromDate ||
                                    leave.startDate
                                ).toLocaleDateString()}
                              </span>

                              <span className="text-zinc-500 text-xs">
                                →
                                {" "}
                                {new Date(
                                  leave.toDate ||
                                    leave.endDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            {leave.totalDays}
                          </td>

                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${
                                leave.status ===
                                "approved"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : leave.status ===
                                    "rejected"
                                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                                  : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              }`}
                            >
                              {leave.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </GlowBorderCard>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;