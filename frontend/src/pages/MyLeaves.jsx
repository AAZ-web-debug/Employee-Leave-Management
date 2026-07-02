import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  FileQuestion,
  Loader2,
  Plus,
} from "lucide-react";
import { format } from "date-fns";

import api from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";
import GlowBorderCard from "../components/GlowBorderCard";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyLeaves();
  }, []);
const [selectedRemark, setSelectedRemark] =
  useState(null);
  const fetchMyLeaves = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get("/leaves/my");
      setLeaves(response.data.data || []);
    } catch (err) {
      console.error("Error fetching leaves:", err);
      setError("Failed to load your leave requests. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelLeave = async (leaveId) => {
  try {
    await api.patch(
      `/leaves/${leaveId}/cancel`
    );

    fetchMyLeaves();
  } catch (error) {
    console.error(error);
  }
};

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      rejected: "bg-red-500/10 text-red-400 border-red-500/20",
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      cancelled:
  "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    };

    const style = statusConfig[status.toLowerCase()] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${style}`}
      >
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 min-h-screen text-zinc-100 pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              My Leaves
            </h1>
            <p className="text-zinc-500 mt-2 text-sm">
              Track all your leave requests
            </p>
          </div>
          <Link
            to="/apply-leave"
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-2.5
              rounded-xl
              bg-white/[0.05]
                border border-white/[0.1]
                hover:bg-white/[0.08]
              text-white font-medium
              transition-all duration-200
              shadow-[0_0_20px_rgba(37,99,235,0.3)]
              hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]
            "
          >
            <Plus size={18} />
            Apply Leave
          </Link>
        </div>

        <GlowBorderCard>
  <div className="dashboard-beam absolute inset-0 bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 opacity-70" />

  <div
    className="
      relative
      w-full
      h-full
      overflow-x-auto
      rounded-3xl
      border border-white/[0.08]
      bg-[#12161d]/95
      backdrop-blur-xl
      shadow-[0_0_80px_rgba(255,255,255,0.03)]
      p-6 sm:p-10
    "
  >

        <div className="relative p-6 sm:p-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                <Loader2 className="h-8 w-8 animate-spin mb-4 text-blue-500" />
                <p>Loading your requests...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                  <FileQuestion className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Something went wrong
                </h3>
                <p className="text-zinc-400 mb-6 max-w-sm">{error}</p>
                <button
                  onClick={fetchMyLeaves}
                  className="px-6 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : leaves.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="h-24 w-24 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.1)] border border-blue-500/20">
                  <CalendarDays className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  No leave requests found
                </h3>
                <p className="text-zinc-400 mb-8 max-w-sm leading-relaxed">
                  You haven't submitted any leave requests yet. When you do,
                  they will appear here for you to track.
                </p>
                <Link
                  to="/apply-leave"
                  className="
                    px-8 py-3
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    hover:bg-white/10 hover:border-white/20
                    text-white font-medium
                    transition-all duration-200
                  "
                >
                  Apply for Leave
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-sm text-zinc-500">
                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        Leave Type
                      </th>
                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        From Date
                      </th>
                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        To Date
                      </th>
                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        Days
                      </th>
                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        Attachment
                      </th>
                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        Remarks
                      </th>
                      
                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        Reviewed By
                      </th>

                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        Reviewed On
                      </th>
                      <th className="text-left py-5 px-4 font-medium whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-sm">
                    {leaves.map((leave) => (
                      <tr
                        key={leave._id}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="py-4 px-4">
                          <div className="text-zinc-200 font-medium capitalize">
                            {leave.leaveType}
                          </div>
                          {leave.reason && (
                            <div className="text-zinc-500 text-xs mt-1 truncate max-w-[200px]">
                              {leave.reason}
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4 text-zinc-400 whitespace-nowrap">
                        {formatDate(
                            leave.startDate ||
                            leave.fromDate ||
                            leave.from ||
                            leave.start_date
                        )}
                        </td>

                        <td className="py-4 px-4 text-zinc-400 whitespace-nowrap">
                        {formatDate(
                            leave.endDate ||
                            leave.toDate ||
                            leave.to ||
                            leave.end_date
                        )}
                        </td>

                        <td className="py-4 px-4">
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/5 text-zinc-300 font-medium">
                            {leave.totalDays}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          {getStatusBadge(leave.status)}
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
                        <div
                          className={`
                            max-w-xs
                            rounded-xl
                            px-3 py-2
                            text-xs
                            break-words
                            border
                            ${
                              leave.status === "approved"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                                : leave.status === "rejected"
                                ? "bg-red-500/10 border-red-500/20 text-red-300"
                                : "bg-yellow-500/10 border-yellow-500/20 text-yellow-300"
                            }
                          `}
                        >
                          <button
                          onClick={() => {
                            if (leave.managerRemarks?.trim()) {
                              setSelectedRemark(
                                leave.managerRemarks
                              );
                            }
                          }}
                          className={`
                            px-3 py-1 rounded-lg text-sm whitespace-nowrap
                            ${
                              leave.status === "approved"
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : leave.status === "rejected"
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            }
                          `}
                        >
                          View Remark
                        </button>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-xs text-zinc-500">
  {leave.reviewedBy?.name || "-"}
</td>

<td className="py-4 px-4 text-zinc-400 whitespace-nowrap">
  {leave.reviewedAt
    ? formatDate(leave.reviewedAt)
    : "-"}
</td>
<td className="py-4 px-4">
  {leave.status === "pending" ? (
    <button
      onClick={() =>
        cancelLeave(leave._id)
      }
      className="
        px-3 py-1.5
        rounded-lg
        bg-red-500/10
        border border-red-500/20
        text-red-400
        text-xs
        hover:bg-red-500/20
        transition
      "
    >
      Cancel
    </button>
  ) : (
    <span className="text-zinc-600 text-xs">
      —
    </span>
  )}
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </div>
            </div>
        </GlowBorderCard>
      </div>

            {selectedRemark && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div
      className="
        bg-[#12161d]
        border border-white/10
        rounded-3xl
        p-6
        w-full
        max-w-lg
      "
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Manager Remarks
      </h2>

      <div
        className="
          rounded-xl
          bg-white/5
          border border-white/10
          p-4
          text-zinc-300
          whitespace-pre-wrap
        "
      >
        {selectedRemark}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() =>
            setSelectedRemark(null)
          }
          className="
            px-4 py-2
            rounded-xl
            border border-white/10
            hover:bg-white/5
            transition
          "
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </DashboardLayout>
  );
};

export default MyLeaves;