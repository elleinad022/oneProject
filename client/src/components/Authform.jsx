import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Authform = () => {
  const [state, setState] = useState("Log In");

  const handleSubmit = () => {};

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
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            id="email"
            name="email"
            className="input w-full"
            placeholder="Type here"
          />
          <p className="label">Required</p>
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            id="password"
            name="password"
            className="input w-full"
            placeholder="Type here"
          />
          <p className="label">Required</p>
        </fieldset>

        {/* Submit Button */}
        <div className="card-actions w-full flex flex-col items-center">
          <button className="btn btn-wide btn-primary">LOG IN</button>
        </div>

        {/* Footer */}
        <p className="text-sm">
          Don't have an account yet?{" "}
          <Link to="/register" className="link link-primary">
            Register here
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default Authform;
