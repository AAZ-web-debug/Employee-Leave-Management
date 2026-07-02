const express = require("express");

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require(
  "../controllers/profile.controller"
);

const {
  protect,
} = require("../middleware/auth.middleware");

const upload = require(
  "../middleware/upload.middleware"
);

const router = express.Router();

router.get(
  "/",
  protect,
  getProfile
);

router.put(
  "/",
  protect,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

router.post(
  "/upload-image",
  protect,
  upload.single("image"),
  uploadProfileImage
);

module.exports = router;