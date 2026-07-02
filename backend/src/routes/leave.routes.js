const express = require("express");

const {
  applyLeave,
  getMyLeaves,
  getLeaveById,
  cancelLeave,
  updateLeave,
} = require("../controllers/leave.controller");

const {
  applyLeaveValidator,
} = require("../validators/leave.validator");

const {
  protect,
} = require("../middleware/auth.middleware");

const leaveUpload = require(
  "../middleware/leaveUpload.middleware"
);

const router = express.Router();

router.post(
  "/",
  protect,
  leaveUpload.single("attachment"),
  applyLeaveValidator,
  applyLeave
);

router.get(
  "/my",
  protect,
  getMyLeaves
);

router.get(
  "/:id",
  protect,
  getLeaveById
);

router.put(
  "/:id",
  protect,
  applyLeaveValidator,
  updateLeave
);

router.patch(
  "/:id/cancel",
  protect,
  cancelLeave
);

module.exports = router;