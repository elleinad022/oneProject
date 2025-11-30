import React from "react";
import Authform from "../components/Authform";
import whiteLogo from "../assets/whiteLogo.png";

const Signup = () => {
  return (
    <div>
      <div className="hero bg-base-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <div>
              <img src={whiteLogo} alt="Project Logo" className="w-7xl" />
            </div>
          </div>
          <Authform mode="Sign up" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
