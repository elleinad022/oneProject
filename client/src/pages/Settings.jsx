import React from "react";
import ProfileUpdate from "../components/ProfileUpdate";
import ProfilePictureUpdate from "../components/ProfilePictureUpdate";
import Navbar from "../components/Navbar";

const Settings = () => {
  return (
    <Navbar>
      <div className="flex flex-wrap gap-6 justify-center pb-4">
        <ProfileUpdate />
        <ProfilePictureUpdate />
      </div>
    </Navbar>
  );
};

export default Settings;
