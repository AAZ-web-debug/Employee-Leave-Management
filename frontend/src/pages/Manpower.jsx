import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";
import GlowBorderCard from "../components/GlowBorderCard";

const Manpower = () => {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [data, setData] = useState(null);

  const [showDutyModal, setShowDutyModal] =
    useState(false);

  const [showLeaveModal, setShowLeaveModal] =
    useState(false);

  const fetchAvailability = async () => {
    try {
      const response = await api.get(
        `/dashboard/availability?date=${date}`
      );

      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [date]);

  const getFormattedDate = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
};

  return (
    <DashboardLayout>
      <div className="space-y-8 min-h-screen text-zinc-100">

        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Manpower
          </h1>

          <p className="text-zinc-500 mt-2 text-sm">
            Workforce availability tracker
          </p>

            <p className="text-blue-400 text-sm mt-1">
  Viewing manpower for {date}
</p>

        </div>

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
  <h2 className="text-xl font-semibold text-white">
    Workforce Availability
  </h2>

  <div className="flex gap-2 mt-4">
    <button
      onClick={() => setDate(getFormattedDate(-1))}
      className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5"
    >
      Yesterday
    </button>

    <button
      onClick={() => setDate(getFormattedDate(0))}
      className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5"
    >
      Today
    </button>

    <button
      onClick={() => setDate(getFormattedDate(1))}
      className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5"
    >
      Tomorrow
    </button>
  </div>
</div>

              <div className="flex flex-col items-start md:items-end gap-2">
  <label className="text-sm text-zinc-400">
    📆  Select Custom Date
  </label>

  <input
  type="date"
  value={date}
  onChange={(e) =>
    setDate(e.target.value)
  }
  className="
    px-4 py-3
    rounded-xl
    bg-black/30
    border border-white/[0.06]
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

            {data && (
              <>
                <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <button
  className="
    text-left
    rounded-2xl
    p-6
    border border-blue-500/20
    bg-blue-500/5
  "
>
  <p className="text-zinc-400">
    Total Employees
  </p>

  <h3 className="text-5xl font-bold text-blue-400 mt-3">
    {data.totalEmployees}
  </h3>
</button>

                  <button
                    onClick={() =>
                      setShowDutyModal(true)
                    }
                    className="
                      text-left
                      rounded-2xl
                      p-6
                      border border-emerald-500/20
                      bg-emerald-500/5
                      hover:bg-emerald-500/10
                      transition
                    "
                  >
                    <p className="text-zinc-400">
                      On Duty
                    </p>

                    <h3 className="text-5xl font-bold text-emerald-400 mt-3">
                      {data.onDutyCount}
                    </h3>
                  </button>

                  <button
                    onClick={() =>
                      setShowLeaveModal(true)
                    }
                    className="
                      text-left
                      rounded-2xl
                      p-6
                      border border-red-500/20
                      bg-red-500/5
                      hover:bg-red-500/10
                      transition
                    "
                  >
                    <p className="text-zinc-400">
                      On Leave
                    </p>

                    <h3 className="text-5xl font-bold text-red-400 mt-3">
                      {data.onLeaveCount}
                    </h3>
                  </button>

                </div>
              </>
            )}
          </div>
        </GlowBorderCard>

        {showDutyModal && (
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
              <h2 className="text-xl font-semibold mb-6">
                Employees On Duty
              </h2>

              <div className="space-y-3 max-h-[500px] overflow-y-auto">

                {data?.onDutyEmployees.map(
                  (employee) => (
                    <Link
                      key={employee._id}
                      to={`/employees/${employee._id}`}
                      className="
                        flex items-center justify-between
                        p-4
                        rounded-xl
                        border border-white/10
                        hover:bg-white/5
                        transition
                      "
                    >
                      <div>
                        <p className="font-medium">
                          {employee.name}
                        </p>

                        <p className="text-sm text-zinc-500">
                          {employee.employeeId}
                        </p>
                      </div>

                      <span className="text-zinc-500 text-sm">
                        {employee.department}
                      </span>
                    </Link>
                  )
                )}

              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() =>
                    setShowDutyModal(false)
                  }
                  className="
                    px-5 py-2
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

        {showLeaveModal && (
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
              <h2 className="text-xl font-semibold mb-6">
                Employees On Leave
              </h2>

              <div className="space-y-3 max-h-[500px] overflow-y-auto">

                {data?.onLeaveEmployees.map(
                  (employee) => (
                    <Link
                      key={employee._id}
                      to={`/employees/${employee._id}`}
                      className="
                        flex items-center justify-between
                        p-4
                        rounded-xl
                        border border-white/10
                        hover:bg-white/5
                        transition
                      "
                    >
                      <div>
                        <p className="font-medium">
                          {employee.name}
                        </p>

                        <p className="text-sm text-zinc-500">
                          {employee.employeeId}
                        </p>
                      </div>

                      <span className="text-red-400 text-sm">
                        {employee.leaveType}
                      </span>
                    </Link>
                  )
                )}

              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() =>
                    setShowLeaveModal(false)
                  }
                  className="
                    px-5 py-2
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

      </div>
    </DashboardLayout>
  );
};

export default Manpower;