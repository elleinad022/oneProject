import React from "react";
import { useState } from "react";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [resetPassword, { isLoading: isResetting }] =
    useResetPasswordMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email || !otp || !newPassword || !newPassword2) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== newPassword2) {
      toast.error("Passwords do not match.");
    } else {
      try {
        await resetPassword({
          email,
          otp,
          newPassword,
        }).unwrap();
        toast.success(
          "Password reset successful! Log in with your new password."
        );
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Recover your account now!</h1>
          <p className="py-6">
            Use the reset password OTP sent to your email address to reset and
            make your new password.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                value={email}
                type="email"
                className="input"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">OTP</label>
              <input
                value={otp}
                type="text"
                className="input"
                placeholder="Reset OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              <label className="label">Password</label>
              <input
                value={newPassword}
                type="password"
                className="input"
                placeholder="Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label className="label">Confirm Password</label>
              <input
                value={newPassword2}
                type="password"
                className="input"
                placeholder="Confirm Password"
                onChange={(e) => setNewPassword2(e.target.value)}
              />

              <button
                onClick={handleResetPassword}
                className="btn btn-neutral mt-4">
                Reset Password
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
