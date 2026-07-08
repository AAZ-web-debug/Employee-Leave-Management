import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Building2,
  Briefcase,
  Camera,
  Edit3,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import api from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";
import GlowBorderCard from "../components/GlowBorderCard";
import { useAuth } from "../context/AuthContext";


const InfoCard = ({
  icon,
  label,
  value,
}) => (
  <div
    className="
      rounded-2xl
      border border-white/[0.06]
      bg-white/[0.02]
      p-5
      hover:bg-white/[0.03]
      transition-all
    "
  >
    <div className="flex items-center gap-2 text-zinc-500 text-sm mb-3">
      {icon}
      <span>{label}</span>
    </div>

    <p className="text-white font-medium break-words">
      {value || "N/A"}
    </p>
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}) => (
  <div>
    <label className="block text-sm text-zinc-500 mb-2">
      {label}
    </label>

    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="
        w-full
        px-4 py-3
        rounded-xl
        bg-white/[0.03]
        border border-white/[0.08]
        text-white
        outline-none
        focus:border-blue-500/50
        transition-all
        disabled:opacity-60
      "
    />
  </div>
);

const PasswordField = ({
  label,
  value,
  onChange,
  show,
  toggleShow,
}) => (
  <div>
    <label className="block text-sm text-zinc-500 mb-2">
      {label}
    </label>

    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4 py-3
          pr-12
          rounded-xl
          bg-white/[0.03]
          border border-white/[0.08]
          text-white
          outline-none
          focus:border-blue-500/50
          transition-all
        "
      />

      <button
        type="button"
        onClick={toggleShow}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-zinc-500
          hover:text-white
        "
      >
        {show ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>
    </div>
  </div>
);

const Profile = () => {

    const { updateUser } = useAuth();

    const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

    const [showNewPassword, setShowNewPassword] =
    useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

    const [passwordError, setPasswordError] =
    useState("");

    const [passwordSuccess, setPasswordSuccess] =
    useState("");

  const [profile, setProfile] = useState(null);

  const [showImageModal, setShowImageModal] = useState(false);

  const [loading, setLoading] =
    useState(false);

    const [selectedImage, setSelectedImage] =
  useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      department: "",
      designation: "",
    });

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response =
        await api.get("/profile");

      const user =
        response.data.data;

      setProfile(user);

      setFormData({
        name: user.name || "",
        department:
          user.department || "",
        designation:
          user.designation || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile =
    async () => {
      try {
        setLoading(true);
        setError("");
        setMessage("");

        const response =
          await api.put(
            "/profile",
            formData
          );

        setProfile(
        response.data.data
      );

      updateUser(
        response.data.data
      );

        setEditing(false);

        setMessage(
          "Profile updated successfully."
        );
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Failed to update profile."
        );
      } finally {
        setLoading(false);
      }
    };

  const handleCancel = () => {
    setFormData({
      name: profile.name || "",
      department:
        profile.department || "",
      designation:
        profile.designation || "",
    });

    setEditing(false);
  };

  const handlePasswordChange = async () => {
  try {
    setPasswordError("");
    setPasswordSuccess("");

        if (
          passwordData.newPassword !==
          passwordData.confirmPassword
        ) {
          return setError(
            "Passwords do not match."
          );
        }

        await api.put(
          "/profile/change-password",
          {
            currentPassword:
              passwordData.currentPassword,
            newPassword:
              passwordData.newPassword,
          }
        );

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        setMessage(
          "Password changed successfully."
        );
      } catch (err) {
    setPasswordError(
      err.response?.data?.message ||
      "Failed to change password."
    );
  }
};

  const handleImageUpload =
    async (e) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      try {
        setUploading(true);

        const form =
          new FormData();

        form.append(
          "image",
          file
        );

        const response =
        await api.post(
          "/profile/upload-image",
          form,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setProfile(
        response.data.data
      );

      updateUser(
        response.data.data
      );

      setMessage(
        "Profile image updated successfully."
      );
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Image upload failed."
        );
      } finally {
        setUploading(false);
      }
    };

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-zinc-500">
            Loading profile...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const imageUrl = profile.profileImage
  ? `http://localhost:5000/${profile.profileImage.replace(/^\/+/, "")}`
  : null;

  return (
    <DashboardLayout>
      <div className="space-y-8 min-h-screen text-zinc-100">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Profile
          </h1>

          <p className="text-zinc-500 mt-2 text-sm">
            Manage your account
            information and security
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
            {message && (
              <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 px-4 py-3">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 px-4 py-3">
                {error}
              </div>
            )}

            <div className="flex flex-col items-center text-center">
              <div className="relative">
                {imageUrl ? (
                  <img
                  src={imageUrl}
                  alt="Profile"
                  onClick={() => setShowImageModal(true)}
                  className="
                    w-28 h-28
                    rounded-full
                    object-cover
                    border border-white/[0.08]
                    cursor-pointer
                    transition-all
                    duration-200
                    hover:scale-105
                    hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]
                  "
                />
                ) : (
                  <div
                    className="
                      w-28 h-28
                      rounded-full
                      bg-white/[0.04]
                      border border-white/[0.08]
                      flex items-center justify-center
                      shadow-[0_0_25px_rgba(37,99,235,0.25)]
                    "
                  >
                    <User size={42} />
                  </div>
                )}

                <label
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-10 h-10
                    rounded-full
                    bg-blue-500
                    flex items-center justify-center
                    cursor-pointer
                    shadow-lg
                  "
                >
                  <Camera size={18} />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageUpload
                    }
                    className="hidden"
                  />
                </label>
              </div>

              <h2 className="text-2xl font-semibold text-white mt-5">
                {profile.name}
              </h2>

              <p className="text-zinc-500">
                {profile.role}
              </p>

              {uploading && (
                <p className="text-blue-400 text-sm mt-2">
                  Uploading image...
                </p>
              )}
            </div>

            <div className="h-px w-full bg-white/[0.08] my-10" />

            <>
  <div className="grid md:grid-cols-2 gap-5">
    <InfoCard
      icon={<User size={16} />}
      label="Full Name"
      value={profile.name}
    />

    <InfoCard
      icon={<Mail size={16} />}
      label="Email Address"
      value={profile.email}
    />

    <InfoCard
      icon={<Shield size={16} />}
      label="Role"
      value={profile.role}
    />

    <InfoCard
      icon={<Building2 size={16} />}
      label="Department"
      value={profile.department}
    />

    <InfoCard
      icon={<Briefcase size={16} />}
      label="Designation"
      value={profile.designation}
    />
  </div>
</>

            <div className="h-px w-full bg-white/[0.08] my-10" />

            {passwordError && (
  <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 px-4 py-3">
    {passwordError}
  </div>
)}

{passwordSuccess && (
  <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 px-4 py-3">
    {passwordSuccess}
  </div>
)}

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Lock size={18} />
                <h3 className="text-xl font-semibold text-white">
                  Change Password
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <PasswordField
                label="Current Password"
                value={passwordData.currentPassword}
                show={showCurrentPassword}
                toggleShow={() =>
                    setShowCurrentPassword(
                    !showCurrentPassword
                    )
                }
                onChange={(e) =>
                    setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                    })
                }
                />

                <PasswordField
                label="New Password"
                value={passwordData.newPassword}
                show={showNewPassword}
                toggleShow={() =>
                    setShowNewPassword(
                    !showNewPassword
                    )
                }
                onChange={(e) =>
                    setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                    })
                }
                />

                <PasswordField
                label="Confirm Password"
                value={passwordData.confirmPassword}
                show={showConfirmPassword}
                toggleShow={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={
                    handlePasswordChange
                  }
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
                  "
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </GlowBorderCard>
      </div>

      {showImageModal && imageUrl && (
  <div
    className="
      fixed inset-0
      z-[9999]
      bg-black/80
      backdrop-blur-sm
      flex items-center justify-center
      p-6
    "
    onClick={() => setShowImageModal(false)}
  >
    <div
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setShowImageModal(false)}
        className="
          absolute
          -top-4
          -right-4
          w-10 h-10
          rounded-full
          bg-[#181c23]
          border border-white/[0.08]
          text-white
          text-lg
          hover:bg-white/[0.08]
          transition-all
        "
      >
        ✕
      </button>

      <img
        src={imageUrl}
        alt="Profile Preview"
        className="
          max-w-[90vw]
          max-h-[85vh]
          rounded-3xl
          border border-white/[0.08]
          shadow-[0_0_60px_rgba(37,99,235,0.35)]
        "
      />
    </div>
  </div>
)}

    </DashboardLayout>
  );
};

export default Profile;