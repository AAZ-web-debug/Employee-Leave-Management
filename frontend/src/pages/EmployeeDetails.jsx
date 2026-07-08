import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";
import api from "../api/axios";

const EmployeeDetails = () => {
  const { id } = useParams();

  const [employee, setEmployee] =
    useState(null);

  const [leaves, setLeaves] =
    useState([]);

  const [selectedRemark, setSelectedRemark] =
  useState(null);

  const [selectedReason, setSelectedReason] =
  useState(null);

  const [loading, setLoading] =
    useState(true);

  const [department, setDepartment] =
  useState("");

  const [saved, setSaved] = useState(false);

const [designation, setDesignation] =
  useState("");

const [saving, setSaving] =
  useState(false);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee =
    async () => {
      try {
        const response =
          await api.get(
            `/employees/${id}`
          );

        setEmployee(
          response.data.data.employee
        );

        setLeaves(
          response.data.data.leaves
        );

        setDepartment(
  response.data.data.employee
    .department || ""
);

setDesignation(
  response.data.data.employee
    .designation || ""
);

        console.log(
  response.data.data.leaves
);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const updateJobDetails =
  async () => {
    try {
      setSaving(true);

      await api.patch(
        `/employees/${id}/job-details`,
        {
          department,
          designation,
        }
      );

      await fetchEmployee();
setSaved(true);

setTimeout(() => {
  setSaved(false);
}, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (!employee) {
    return (
      <DashboardLayout>
        <div className="text-red-400">
          Employee not found
        </div>
      </DashboardLayout>
    );
  }

  const imageUrl =
    employee.profileImage
      ? `http://localhost:5000/${employee.profileImage}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          employee.name
        )}`;

        const allocatedLeaves = 20;

const remainingLeaves =
  employee.annualLeaveBalance ?? 20;

const usedLeaves =
  allocatedLeaves - remainingLeaves;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Employee Details
            </h1>

            <p className="text-zinc-500 mt-2">
              Employee profile and leave history
            </p>
          </div>

          <Link
            to="/employees"
            className="
              px-5 py-2
              rounded-xl
              border border-white/10
              hover:bg-white/5
              transition
            "
          >
            Back
          </Link>
        </div>

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-[#12161d]
            p-8
          "
        >
          <div className="flex items-center gap-6">

            <img
              src={imageUrl}
              alt={employee.name}
              className="
                w-28 h-28
                rounded-full
                object-cover
                border border-white/10
              "
            />

            <div>
  <h2 className="text-2xl font-bold text-white">
    {employee.name}
  </h2>

  <p className="text-zinc-400 mt-1">
    {employee.email}
  </p>

  <p className="text-zinc-400 mt-1">
    Employee ID:{" "}
    {employee.employeeId || "N/A"}
  </p>

  <p className="text-zinc-400 mt-1">
    Joined:{" "}
    {new Date(
      employee.createdAt
    ).toLocaleDateString()}
  </p>

  <div className="mt-3">
  <label className="block text-sm text-zinc-500 mb-1">
    Department
  </label>

  <input
    value={department}
    onChange={(e) =>
      setDepartment(
        e.target.value
      )
    }
    className="
      w-full
      bg-white/5
      border border-white/10
      rounded-xl
      px-4 py-2
      text-white
    "
  />
</div>

<div className="mt-3">
  <label className="block text-sm text-zinc-500 mb-1">
    Designation
  </label>

  <input
    value={designation}
    onChange={(e) =>
      setDesignation(
        e.target.value
      )
    }
    className="
      w-full
      bg-white/5
      border border-white/10
      rounded-xl
      px-4 py-2
      text-white
    "
  />
</div>

<button
  onClick={updateJobDetails}
  disabled={saving}
  className="
    mt-4
    px-5 py-3
    rounded-2xl
    border border-blue-500/30
    bg-blue-500/10
    text-blue-400
    hover:bg-blue-500/20
    transition-all
    duration-300
    disabled:opacity-50
  "
>
  {saving
    ? "Saving Changes..."
    : "Save Changes"}
</button>


{saved && (
  <p className="mt-3 text-green-400 text-sm">
    ✓ Employee details updated successfully
  </p>
)}

  <p className="text-zinc-400 mt-1">
  Leave Balance:{" "}
  {remainingLeaves}/{allocatedLeaves}
</p>

</div>

          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4">

  <div className="rounded-3xl border border-white/10 bg-[#12161d] p-6">
    <p className="text-zinc-500 text-sm">
      Total Requests
    </p>

    <h2 className="text-3xl font-bold text-white mt-2">
      {leaves.length}
    </h2>
  </div>

  <div className="rounded-3xl border border-white/10 bg-[#12161d] p-6">
    <p className="text-zinc-500 text-sm">
      Approved
    </p>

    <h2 className="text-3xl font-bold text-green-400 mt-2">
      {
        leaves.filter(
          (leave) =>
            leave.status === "approved"
        ).length
      }
    </h2>
  </div>

  <div className="rounded-3xl border border-white/10 bg-[#12161d] p-6">
    <p className="text-zinc-500 text-sm">
      Pending
    </p>

    <h2 className="text-3xl font-bold text-yellow-400 mt-2">
      {
        leaves.filter(
          (leave) =>
            leave.status === "pending"
        ).length
      }
    </h2>
  </div>

  <div className="rounded-3xl border border-white/10 bg-[#12161d] p-6">
  <p className="text-zinc-500 text-sm">
    Rejected
  </p>

  <h2 className="text-3xl font-bold text-red-400 mt-2">
    {
      leaves.filter(
        (leave) =>
          leave.status === "rejected"
      ).length
    }
  </h2>
</div>

<div className="rounded-3xl border border-white/10 bg-[#12161d] p-6">
  <p className="text-zinc-500 text-sm">
    Leave Balance
  </p>

  <h2 className="text-3xl font-bold text-blue-400 mt-2">
    {remainingLeaves}
  </h2>

  <p className="text-xs text-zinc-500 mt-2">
    Used {usedLeaves} of {allocatedLeaves}
  </p>
</div>

</div>

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-[#12161d]
            p-6
          "
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Leave History
          </h2>

          {leaves.length === 0 ? (
            <div
  className="
    text-center
    py-12
    border border-dashed border-white/10
    rounded-2xl
  "
>
  <div className="text-4xl">
    📄
  </div>

  <h3 className="text-white mt-4 font-medium">
    No Leave Records
  </h3>

  <p className="text-zinc-500 mt-2">
    This employee has not submitted any
    leave requests yet.
  </p>
</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500">
                    <th className="text-left py-4">
                      Leave Type
                    </th>
                    <th className="text-left py-4">
                      Reason
                    </th>

                    <th className="text-left py-4">
                      From
                    </th>

                    <th className="text-left py-4">
                      To
                    </th>

                    <th className="text-left py-4">
                      Days
                    </th>

                    <th className="text-left py-4">
                      Status
                    </th>

                    <th className="text-left py-4">
                      Manager Remarks
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {leaves.map(
                    (leave) => (
                      <tr
                        key={leave._id}
                        className="border-b border-white/5"
                      >
                        <td className="py-4">
                          {
                            leave.leaveType
                          }
                        </td>

                        <td className="py-4">
  <button
    onClick={() =>
      setSelectedReason(
        leave.reason || "No reason provided"
      )
    }
    className="
      inline-flex
      items-center
      px-3 py-1.5
      rounded-lg
      bg-purple-500/10
      border border-purple-500/20
      text-purple-400
      text-xs
      hover:bg-purple-500/20
      transition
    "
  >
    View Reason
  </button>
</td>

                        <td className="py-4">
                          {new Date(
                            leave.fromDate
                          ).toLocaleDateString()}
                        </td>

                        <td className="py-4">
                          {new Date(
                            leave.toDate
                          ).toLocaleDateString()}
                        </td>

                        <td className="py-4">
                          {
                            leave.totalDays
                          }
                        </td>

                        <td className="py-4">
                          <span
                            className={`
                              px-3 py-1
                              rounded-full
                              text-xs
                              ${
                                leave.status ===
                                "approved"
                                  ? "bg-green-500/20 text-green-400"
                                  : leave.status ===
                                    "rejected"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }
                            `}
                          >
                            {
                              leave.status
                            }
                          </span>
                        </td>

                        <td className="py-4">
                        <div
                          className="
                            max-w-xs
                            rounded-lg
                            bg-white/5
                            border border-white/10
                            px-3 py-2
                            text-xs text-zinc-300
                          "
                        >
                          <button
                            onClick={() => {
                              if (leave.managerRemarks?.trim()) {
                                setSelectedRemark(
                                  leave.managerRemarks
                                );
                              }
                            }}
                            className="text-left w-full"
                          >
                            {leave.managerRemarks?.trim()
                              ? leave.managerRemarks.length > 40
                                ? `${leave.managerRemarks.slice(
                                    0,
                                    40
                                  )}...`
                                : leave.managerRemarks
                              : "No remarks"}
                          </button>
                        </div>
                      </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

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
        max-w-2xl
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
          "
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{selectedReason && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div
      className="
        bg-[#12161d]
        border border-white/10
        rounded-3xl
        p-6
        w-full
        max-w-2xl
      "
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Leave Reason
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
        {selectedReason}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() =>
            setSelectedReason(null)
          }
          className="
            px-4 py-2
            rounded-xl
            border border-white/10
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

export default EmployeeDetails;