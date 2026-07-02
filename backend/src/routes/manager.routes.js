const express = require("express");

const {
  getAllLeaves,
  approveLeave,
  rejectLeave,
} = require("../controllers/manager.controller");

const {
  protect,
} = require("../middleware/auth.middleware");

const authorize = require(
  "../middleware/role.middleware"
);

const router = express.Router();

router.use(
  protect,
  authorize("manager")
);

router.get(
  "/leaves",
  getAllLeaves
);

router.patch(
  "/:id/approve",
  approveLeave
);

router.patch(
  "/:id/reject",
  rejectLeave
);

module.exports = router;