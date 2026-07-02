const bcrypt = require("bcryptjs");

const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProfile = async (
  req,
  res
) => {
  try {
    const {
      name,
      department,
      designation,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        department,
        designation,
      },
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    const isMatch =
      await user.comparePassword(
        currentPassword
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is incorrect",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        newPassword,
        salt
      );

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const uploadProfileImage =
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload an image",
        });
      }

      const imagePath =
      req.file.filename
        ? `uploads/${req.file.filename}`
        : "";

      const user =
        await User.findByIdAndUpdate(
          req.user._id,
          {
            profileImage:
              imagePath,
          },
          {
            new: true,
          }
        ).select("-password");

      return res.status(200).json({
        success: true,
        message:
          "Profile image uploaded successfully",
        data: user,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Internal Server Error",
      });
    }
  };

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
};