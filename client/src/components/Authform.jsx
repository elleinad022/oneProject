import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Authform = ({ mode }) => {
  const [state, setState] = useState(mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="card card-border bg-base-200 w-2xl shadow-md card-xl">
      <form
        onSubmit={handleSubmit}
        className="card-body flex flex-col justify-center items-center gap-3">
        {/* Header */}
        <div className="w-full max-w-md text-start">
          <h1 className="card-title text-3xl text-base-content">
            {state === "Log In" ? "Log In" : "Sign Up"}
          </h1>
          <p className="text-sm text-base-content/60">
            {state === "Log In" ? "To your account" : "To make an account"}
          </p>
        </div>

        {/* Input Fields */}
        <fieldset className="fieldset w-full max-w-sm">
          {state !== "Log In" && (
            <>
              <legend className="fieldset-legend">Name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="label">Required</p>
            </>
          )}

          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            className="input w-full"
            placeholder="Type here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="label">Required</p>
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input w-full"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="label">Required</p>
          {state !== "Log In" && (
            <>
              <legend className="fieldset-legend">Confirm Password</legend>
              <input
                type="password"
                className="input w-full"
                placeholder="Type here"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <p className="label">Required</p>
            </>
          )}
        </fieldset>

        {/* Submit Button */}
        <div className="card-actions w-full flex flex-col items-center">
          <button type="submit" className="btn btn-wide btn-primary">
            {state === "Log In" ? "LOG IN" : "SIGN UP"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm">
          {state === "Log In"
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            to={state === "Log In" ? "/register" : "/login"}
            className="link link-primary">
            {state === "Log In" ? "Register here" : "Log In"}
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default Authform;
