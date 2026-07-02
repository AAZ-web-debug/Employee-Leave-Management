const Leave = require("../models/Leave");
const User = require("../models/User");

const getAllLeaves = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      status,
      leaveType,
      employeeName,
      sort,
    } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (leaveType) {
      filter.leaveType = leaveType;
    }

    let query = Leave.find(filter).populate(
      "employee",
      "name email department designation profileImage"
    );

    const leaves = await query
      .sort({
        [sort || "createdAt"]: -1,
      })
      .skip(skip)
      .limit(limit);

      const validLeaves = leaves.filter(
  (leave) => leave.employee
);

    let filteredLeaves = validLeaves;

    if (employeeName) {
      filteredLeaves = validLeaves.filter(
        (leave) =>
          leave.employee &&
          leave.employee.name
            .toLowerCase()
            .includes(employeeName.toLowerCase())
      );
    }

    const totalRecords =
      await Leave.countDocuments(filter);

    const totalPages = Math.ceil(
      totalRecords / limit
    );

    return res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages,
      },
      data: filteredLeaves,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(
    req.params.id
  ).populate("employee");

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    const employee = leave.employee;

    if (
      employee.annualLeaveBalance <
      leave.totalDays
    ) {
      return res.status(400).json({
        success: false,
        message: `Employee only has ${employee.annualLeaveBalance} leave days remaining.`,
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending leave requests can be approved",
      });
    }

    employee.annualLeaveBalance -=
    leave.totalDays;

  await employee.save();

    leave.status = "approved";
    leave.managerRemarks =
      req.body?.managerRemarks || "";
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();

    await leave.save();

    return res.status(200).json({
      success: true,
      message: "Leave approved successfully",
      data: leave,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(
      req.params.id
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending leave requests can be rejected",
      });
    }

    leave.status = "rejected";
    leave.managerRemarks =
      req.body?.managerRemarks || "";
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();

    await leave.save();

    return res.status(200).json({
      success: true,
      message: "Leave rejected successfully",
      data: leave,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllLeaves,
  approveLeave,
  rejectLeave,
};