import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import {
  useUpdateUserMutation,
  useSendVerifyOtpMutation,
  useLazyGetUserDataQuery,
  useVerifyEmailMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [sendVerifyOtp, { isLoading: isSending }] = useSendVerifyOtpMutation();
  const [getUser] = useLazyGetUserDataQuery();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  const openOtpModal = async () => {
    if (userInfo.isVerified === true) {
      console.log("Already Verified");
      return;
    }
    try {
      await sendVerifyOtp({ email: userInfo.email }).unwrap();
      const user = await getUser().unwrap();
      dispatch(setCredentials({ ...user.userData }));
      toast.success("Verification OTP sent!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    // Always open modal
    document.getElementById("my_modal_5").showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please provide the OTP sent to your email.");
      return;
    }

    try {
      const res = await verifyEmail({ otp }).unwrap();
      const user = await getUser().unwrap();
      dispatch(setCredentials({ ...user.userData }));
      toast.success(res.message || "Email Verified successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-4xl border p-4">
        <legend className="fieldset-legend text-primary text-xl">
          Profile Information
        </legend>

        <label className="label">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="input w-full"
          placeholder="Name"
        />

        <label className="label">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="input w-full"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input w-full"
          placeholder="Password"
        />

        <label className="label">Confirm Password</label>
        <input
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          className="input w-full"
          placeholder="Confirm Password"
        />

        <div className="divider divider-secondary divider-start">
          Account Status
        </div>

        <div className="border border-secondary rounded-field flex flex-col gap-1 justify-center items-start">
          <div className="flex flex-col items-center gap-1 p-2 w-full">
            <h2 className="text-gray-300 text-sm">
              Account Email Verification
            </h2>
            <p>
              Email Address verification status:
              <span className="font-extrabold text-sm text-secondary">
                {userInfo.isVerified ? " Verified" : " Not Verified"}
              </span>
            </p>

            <button
              onClick={openOtpModal}
              type="button"
              className="btn btn-secondary relative"
              disabled={userInfo.isVerified}>
              {isSending && (
                <span className="absolute inset-0 flex items-center justify-center bg-secondary/50 rounded">
                  <Loader />
                </span>
              )}
              {userInfo.isVerified ? "Verified" : "Verify Email"}
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Email Address OTP Verification
                </h3>
                <p className="py-4 text-sm">
                  Current email provided by user: {userInfo.email}
                </p>
                <div className="modal-action justify-center">
                  <div className="w-full">
                    {/* if there is a button in div, it will close the modal */}
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        OTP sent to your email
                      </legend>
                      <input
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        type="text"
                        className="input w-full"
                        placeholder="Type here"
                      />
                      <button
                        onClick={handleVerify}
                        type="button"
                        className="btn btn-secondary mt-2">
                        Verify OTP
                      </button>
                    </fieldset>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("my_modal_5").close()
                      }
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          </div>
        </div>

        {/* Center this Loader */}

        <button className="btn btn-primary mt-4 relative">
          {isUpdating && (
            <span className="absolute inset-0 flex items-center justify-center bg-primary/50 rounded">
              <Loader />
            </span>
          )}
          Save Updates
        </button>

        <Link to="/" className="btn btn-neutral mt-4">
          Cancel
        </Link>
      </fieldset>
    </form>
  );
};

export default ProfileUpdate;
