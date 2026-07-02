import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import api from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";
import GlowBorderCard from "../components/GlowBorderCard";

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

const ManagerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchLeaves();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get(
        "/dashboard/manager"
      );

      setStats(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [selectedLeave, setSelectedLeave] =
  useState(null);

const [actionType, setActionType] =
  useState("");

const [managerRemarks, setManagerRemarks] =
  useState("");

const [showRemarksModal, setShowRemarksModal] =
  useState(false);

  const fetchLeaves = async () => {
    try {
      const response = await api.get(
        "/manager/leaves?limit=10"
      );

      setLeaves(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approveLeave = async () => {
  try {
    await api.patch(
      `/manager/${selectedLeave._id}/approve`,
      {
        managerRemarks,
      }
    );

    setShowRemarksModal(false);
    setManagerRemarks("");
    setSelectedLeave(null);

    fetchDashboard();
    fetchLeaves();
  } catch (error) {
    console.error(error);
  }
};

  const rejectLeave = async () => {
  try {
    await api.patch(
      `/manager/${selectedLeave._id}/reject`,
      {
        managerRemarks,
      }
    );

    setShowRemarksModal(false);
    setManagerRemarks("");
    setSelectedLeave(null);

    fetchDashboard();
    fetchLeaves();
  } catch (error) {
    console.error(error);
  }
};


  return (
    <DashboardLayout>
      <div className="space-y-8 min-h-screen text-zinc-100">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Manager Dashboard
          </h1>

          <p className="text-zinc-500 mt-2 text-sm">
            Overview of employee leave requests
          </p>
        </div>

        {!stats ? (
          <div className="text-zinc-500 flex items-center justify-center py-20">
            <div className="animate-pulse">Loading dashboard...</div>
          </div>
        ) : (
          <GlowBorderCard>
            {/* Glowing Border Background */}
            <div className="dashboard-beam absolute inset-0 bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 opacity-70" />
            
            {/* Inner Container */}
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
              {/* Overview Section */}
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-white">
                  Overview
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
                <StatItem
                  icon={<Users size={16} />}
                  label="Employees"
                  value={stats.totalEmployees}
                />

                <StatItem
                  icon={<FileText size={16} />}
                  label="Requests"
                  value={stats.totalLeaveRequests}
                />

                <StatItem
                  icon={
                    <Clock3
                      size={16}
                      className="text-yellow-500"
                    />
                  }
                  label="Pending"
                  value={stats.pendingRequests}
                />

                <StatItem
                  icon={
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500"
                    />
                  }
                  label="Approved"
                  value={stats.approvedRequests}
                />

                <StatItem
                  icon={
                    <XCircle
                      size={16}
                      className="text-red-500"
                    />
                  }
                  label="Rejected"
                  value={stats.rejectedRequests}
                />
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-white/[0.08] my-10" />

              {/* Table Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Recent Leave Requests
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-sm text-zinc-500">
                      <th className="text-left py-4 px-4 font-medium whitespace-nowrap">
                        Employee
                      </th>
                      <th className="text-left py-4 px-4 font-medium whitespace-nowrap">
                        Leave Type
                      </th>

                    <th className="text-left py-4 px-4 font-medium whitespace-nowrap">
                    Duration
                    </th>

                      <th className="text-left py-4 px-4 font-medium whitespace-nowrap">
                        Days
                      </th>
                      <th className="text-left py-4 px-4 font-medium whitespace-nowrap">
                        Attachment
                      </th>
                      <th className="text-left py-4 px-4 font-medium whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 font-medium whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-sm">
                    {leaves.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-16 text-center text-zinc-500"
                        >
                          No recent leave requests found.
                        </td>
                      </tr>
                    ) : (
                      leaves.map((leave) => (
                        <tr
                          key={leave._id}
                          className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group"
                        >
                          <td className="py-4 px-4">
                          <Link
                            to={`/employees/${leave.employee?._id}`}
                            className="
                              flex items-center gap-3
                              hover:text-blue-400
                              transition-colors
                            "
                          >
                            <img
                              src={
                                leave.employee?.profileImage
                                  ? `http://localhost:5000/${leave.employee.profileImage}`
                                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                      leave.employee?.name || "Employee"
                                    )}`
                              }
                              alt={leave.employee?.name}
                              className="
                                w-10 h-10
                                rounded-full
                                object-cover
                                border border-white/10
                              "
                            />

                            <span className="font-medium text-zinc-200">
                              {leave.employee?.name}
                            </span>
                          </Link>
                        </td>

                          <td className="py-4 px-4 text-zinc-400 capitalize">
                            {leave.leaveType}
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-zinc-200 text-sm font-medium">
                                {new Date(
                                    leave.fromDate || leave.startDate
                                ).toLocaleDateString()}
                                </span>

                                <span className="text-zinc-500 text-xs">
                                →{" "}
                                {new Date(
                                    leave.toDate || leave.endDate
                                ).toLocaleDateString()}
                                </span>
                            </div>
                            </td>

                            <td className="py-4 px-4 text-zinc-400">
                            {leave.totalDays}
                            </td>

                            <td className="py-4 px-4">
  {leave.attachment ? (
    <a
      href={`http://localhost:5000/${leave.attachment}`}
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex
        items-center
        px-3 py-1.5
        rounded-lg
        bg-blue-500/10
        border border-blue-500/20
        text-blue-400
        text-xs
        hover:bg-blue-500/20
        transition
      "
    >
      📄 View File
    </a>
  ) : (
    <span className="text-zinc-600 text-xs">
      —
    </span>
  )}
</td>

                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${
                              leave.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              leave.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            }`}>
                              {leave.status}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            {leave.status === "pending" ? (
                              <div className="flex gap-3">
                                <button
                                  onClick={() => {
                                  setSelectedLeave(leave);
                                  setActionType("approve");
                                  setShowRemarksModal(true);
                                }}
                                  className="
                                    px-4 py-2
                                    rounded-xl
                                    border border-emerald-500/20
                                    bg-emerald-500/10
                                    text-emerald-400
                                    hover:bg-emerald-500/20
                                    hover:border-emerald-500/30
                                    transition-all
                                    text-xs font-semibold
                                  "
                                >
                                  Approve
                                </button>

                                <button
                                  onClick={() => {
                                  setSelectedLeave(leave);
                                  setActionType("reject");
                                  setShowRemarksModal(true);
                                }}
                                  className="
                                    px-4 py-2
                                    rounded-xl
                                    border border-red-500/20
                                    bg-red-500/10
                                    text-red-400
                                    hover:bg-red-500/20
                                    hover:border-red-500/30
                                    transition-all
                                    text-xs font-semibold
                                  "
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-zinc-600 text-xs italic">
                                Processed
                              </span>
                            )}
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

        {showRemarksModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div
  className="
    bg-[#12161d]/95
    backdrop-blur-xl
    border border-white/10
    rounded-3xl
    p-6
    w-full
    max-w-lg
    shadow-[0_0_60px_rgba(0,0,0,0.5)]
  "
>
      
      <h2 className="text-xl font-semibold text-white mb-4">
        {actionType === "approve"
          ? "Approve Leave"
          : "Reject Leave"}
      </h2>

      <textarea
        value={managerRemarks}
        onChange={(e) =>
          setManagerRemarks(e.target.value)
        }
        rows="4"
        placeholder="Enter remarks..."
        className="
          w-full
          bg-black/30
          border border-white/10
          rounded-xl
          p-3
          text-white
          resize-none
        "
      />

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => {
            setShowRemarksModal(false);
            setManagerRemarks("");
            setSelectedLeave(null);
          }}
          className="
  px-5 py-2.5
  rounded-xl
  border border-white/10
  bg-white/[0.03]
  text-zinc-300
  hover:bg-white/[0.06]
  hover:border-white/20
  transition-all
"
        >
          Cancel
        </button>

        <button
  onClick={
    actionType === "approve"
      ? approveLeave
      : rejectLeave
  }
  className={`
    px-5 py-2.5
    rounded-xl
    font-medium
    transition-all
    duration-200
    border
    shadow-lg
    ${
      actionType === "approve"
        ? `
          bg-emerald-500/10
          border-emerald-500/20
          text-emerald-400
          hover:bg-emerald-500/20
          hover:border-emerald-500/40
          hover:shadow-emerald-500/10
        `
        : `
          bg-red-500/10
          border-red-500/20
          text-red-400
          hover:bg-red-500/20
          hover:border-red-500/40
          hover:shadow-red-500/10
        `
    }
  `}
>
  {actionType === "approve"
    ? "Approve Leave"
    : "Reject Leave"}
</button>
          
      </div>
    </div>
  </div>
)}

    </DashboardLayout>
  );
};

export default ManagerDashboard;