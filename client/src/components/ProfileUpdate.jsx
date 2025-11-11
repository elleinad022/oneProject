import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

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

        <div className="divider divider-secondary">Account Status</div>

        <div className="border border-secondary rounded-field flex flex-col gap-1 justify-center items-start">
          <div className="flex flex-col items-start gap-1 p-2 w-full">
            <h2 className="text-gray-300 text-sm">
              Account Email Verification
            </h2>
            <p className="">Email Address verification status: Not Verified</p>
            {/* This Button must be isolated to not trigger profile update form submission */}
            <button className="btn btn-secondary self-center">
              Verify Email
            </button>
          </div>
        </div>

        {isLoading && <Loader />}

        <button className="btn btn-primary mt-4">Save Updates</button>

        <Link to="/" className="btn btn-neutral mt-4">
          Cancel
        </Link>
      </fieldset>
    </form>
  );
};

export default ProfileUpdate;
