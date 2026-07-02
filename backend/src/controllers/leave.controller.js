const { validationResult } = require("express-validator");

const Leave = require("../models/Leave");

const applyLeave = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      leaveType,
      fromDate,
      toDate,
      reason,
    } = req.body;

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if (startDate > endDate) {
      return res.status(400).json({
        success: false,
        message: "From date cannot be after To date",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      return res.status(400).json({
        success: false,
        message: "Past dates are not allowed",
      });
    }

    const existingLeave = await Leave.findOne({
      employee: req.user._id,
      status: {
        $in: ["pending", "approved"],
      },
      $or: [
        {
          fromDate: { $lte: endDate },
          toDate: { $gte: startDate },
        },
      ],
    });

    if (existingLeave) {
  const statusText =
    existingLeave.status === "pending"
      ? "pending"
      : "approved";

  return res.status(409).json({
    success: false,
    message: `You already have a ${statusText} leave request from ${existingLeave.fromDate.toLocaleDateString()} to ${existingLeave.toDate.toLocaleDateString()}.`,
  });
}

    const totalDays =
      Math.ceil(
        (endDate - startDate) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    const attachment =
  req.file
    ? `uploads/leave-attachments/${req.file.filename}`
    : "";

const leave = await Leave.create({
  employee: req.user._id,
  leaveType,
  fromDate: startDate,
  toDate: endDate,
  reason,
  totalDays,
  attachment,
});

    return res.status(201).json({
      success: true,
      message: "Leave applied successfully",
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

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
  employee: req.user._id,
})
.populate(
  "reviewedBy",
  "name"
)
.sort({
  createdAt: -1,
});

    return res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getLeaveById = async (req, res) => {
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

    if (
      leave.employee.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
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

const updateLeave = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const leave = await Leave.findById(
      req.params.id
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    if (
      leave.employee.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending leave requests can be updated",
      });
    }

    const {
      leaveType,
      fromDate,
      toDate,
      reason,
    } = req.body;

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if (startDate > endDate) {
      return res.status(400).json({
        success: false,
        message: "From date cannot be after To date",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      return res.status(400).json({
        success: false,
        message: "Past dates are not allowed",
      });
    }

    const existingLeave = await Leave.findOne({
      _id: { $ne: leave._id },
      employee: req.user._id,
      status: {
        $in: ["pending", "approved"],
      },
      fromDate: { $lte: endDate },
      toDate: { $gte: startDate },
    });

    if (existingLeave) {
  const statusText =
    existingLeave.status === "pending"
      ? "pending"
      : "approved";

  return res.status(409).json({
    success: false,
    message: `You already have a ${statusText} leave request from ${existingLeave.fromDate.toLocaleDateString()} to ${existingLeave.toDate.toLocaleDateString()}.`,
  });
}

    const totalDays =
      Math.ceil(
        (endDate - startDate) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    leave.leaveType = leaveType;
    leave.fromDate = startDate;
    leave.toDate = endDate;
    leave.reason = reason;
    leave.totalDays = totalDays;

    await leave.save();

    return res.status(200).json({
      success: true,
      message: "Leave updated successfully",
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

const cancelLeave = async (req, res) => {
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

    if (
      leave.employee.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending leave requests can be cancelled",
      });
    }

    leave.status = "cancelled";

    await leave.save();

    return res.status(200).json({
      success: true,
      message: "Leave cancelled successfully",
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
  applyLeave,
  getMyLeaves,
  getLeaveById,
  updateLeave,
  cancelLeave,
};