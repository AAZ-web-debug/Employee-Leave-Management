import { useState, useEffect } from "react";

import api from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";
import GlowBorderCard from "../components/GlowBorderCard";

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  const [attachment, setAttachment] =
  useState(null);

  const [leaveBalance, setLeaveBalance] =
  useState(20);

const leaveDays =
  formData.fromDate && formData.toDate
    ? Math.ceil(
        (new Date(formData.toDate) -
          new Date(formData.fromDate)) /
          (1000 * 60 * 60 * 24)
      ) + 1
    : 0;

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchLeaveBalance = async () => {
  try {
    const response = await api.get(
      "/profile"
    );

    setLeaveBalance(
      response.data.data
        ?.annualLeaveBalance ?? 20
    );
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchLeaveBalance();
}, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  try {
    const payload = new FormData();

    payload.append(
      "leaveType",
      formData.leaveType
    );

    payload.append(
      "fromDate",
      formData.fromDate
    );

    payload.append(
      "toDate",
      formData.toDate
    );

    payload.append(
      "reason",
      formData.reason
    );

    if (attachment) {
      payload.append(
        "attachment",
        attachment
      );
    }

    const response = await api.post(
      "/leaves",
      payload,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    setIsSuccess(true);
    setMessage(response.data.message);

    setFormData({
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
    });

    setAttachment(null);
  } catch (error) {
    setIsSuccess(false);

    setMessage(
      error.response?.data?.message ||
        "Failed to apply leave"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <DashboardLayout>
      <div className="space-y-8 min-h-screen text-zinc-100 pb-10">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Apply Leave
          </h1>

          <p className="text-zinc-500 mt-2 text-sm">
            Submit a leave request for approval
          </p>
        </div>

        {message && (
        <div
          className={`
            rounded-2xl
            p-4
            border
            ${
              isSuccess
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }
          `}
        >
          {message}
        </div>
      )}

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
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white">
                Leave Request
              </h2>

              <p className="text-zinc-500 text-sm mt-1">
                Fill out the details below to submit a leave request.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block mb-2 text-sm tracking-wide text-zinc-500">
                  Leave Type
                </label>

                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    bg-black/30
                    border border-white/[0.06]
                    rounded-xl
                    px-4 py-3
                    text-white
                    outline-none
                    transition-all
                    duration-300
                    hover:border-white/[0.12]
                    focus:border-white/[0.16]
                  "
                >
                  <option value="">
                    Select Leave Type
                  </option>

                  <option value="Sick Leave">
                    Sick Leave
                  </option>

                  <option value="Casual Leave">
                    Casual Leave
                  </option>

                  <option value="Annual Leave">
                    Annual Leave
                  </option>

                  <option value="Work From Home">
                    Work From Home
                  </option>

                  <option value="Emergency Leave">
                    Emergency Leave
                  </option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm tracking-wide text-zinc-500">
                    From Date
                  </label>

                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      bg-black/30
                      border border-white/[0.06]
                      rounded-xl
                      px-4 py-3
                      text-white
                      [color-scheme:dark]
                      outline-none
                      transition-all
                      duration-300
                      hover:border-white/[0.12]
                      focus:border-white/[0.16]
                    "
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm tracking-wide text-zinc-500">
                    To Date
                  </label>

                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      bg-black/30
                      border border-white/[0.06]
                      rounded-xl
                      px-4 py-3
                      text-white
                      [color-scheme:dark]
                      outline-none
                      transition-all
                      duration-300
                      hover:border-white/[0.12]
                      focus:border-white/[0.16]
                    "
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">

  <div
    className="
      rounded-2xl
      border border-emerald-500/20
      bg-emerald-500/10
      p-4
    "
  >
    <p className="text-emerald-400 text-sm">
      Remaining Leave Balance
    </p>

    <p className="text-white text-2xl font-semibold mt-1">
      {leaveBalance} Days
    </p>
  </div>

  {leaveDays > 0 && (
    <div
      className="
        rounded-2xl
        border border-blue-500/20
        bg-blue-500/10
        p-4
      "
    >
      <p className="text-blue-400 text-sm">
        Selected Duration
      </p>

      <p className="text-white text-2xl font-semibold mt-1">
        {leaveDays} Day{leaveDays > 1 ? "s" : ""}
      </p>
    </div>
  )}

</div>

{leaveDays > leaveBalance && (
  <div
    className="
      rounded-2xl
      border border-red-500/20
      bg-red-500/10
      p-4
    "
  >
    <p className="text-red-400">
      Requested leave exceeds your available balance.
    </p>
  </div>
)}
              
              <div>
                <label className="block mb-2 text-sm tracking-wide text-zinc-500">
                  Reason
                </label>

                <textarea
                  name="reason"
                  rows="5"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    bg-black/30
                    border border-white/[0.06]
                    rounded-xl
                    px-4 py-3
                    text-white
                    outline-none
                    resize-none
                    transition-all
                    duration-300
                    hover:border-white/[0.12]
                    focus:border-white/[0.16]
                  "
                />
              </div>

              <div>
  <label className="block mb-2 text-sm tracking-wide text-zinc-500">
    Attachment (Optional)
  </label>

  <div className="flex gap-3">
    <label
      className="
        flex-1
        flex items-center justify-center
        px-4 py-3
        rounded-xl
        border border-white/[0.06]
        bg-black/30
        cursor-pointer
        hover:border-white/[0.12]
        transition-all
        duration-300
        text-white
      "
    >
      {attachment
        ? `📄 ${attachment.name}`
        : "Upload Attachment"}

      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) =>
          setAttachment(e.target.files[0])
        }
        className="hidden"
      />
    </label>

    {attachment && (
      <button
        type="button"
        onClick={() =>
          setAttachment(null)
        }
        className="
          px-4
          rounded-xl
          border border-red-500/20
          bg-red-500/10
          text-red-400
          hover:bg-red-500/20
          transition-all
        "
      >
        Remove
      </button>
    )}
  </div>

  <p className="text-xs text-zinc-500 mt-2">
    Upload PDF, JPG or PNG (optional)
  </p>
</div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-6 py-3
                    rounded-xl
                    bg-white/[0.05]
                    border border-white/[0.1]
                    hover:bg-white/[0.08]
                    text-white
                    font-medium
                    transition-all
                    duration-200
                    shadow-[0_0_20px_rgba(37,99,235,0.3)]
                    hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? "Applying..."
                    : "Apply Leave"}
                </button>
              </div>
            </form>
          </div>
        </GlowBorderCard>
      </div>
    </DashboardLayout>
  );
};

export default ApplyLeave;