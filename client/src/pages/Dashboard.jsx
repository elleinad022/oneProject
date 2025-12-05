import React from "react";
import Navbar from "../components/Navbar";
import Linegraph from "../components/Linegraph";

const Dashboard = () => {
  return (
    <div className="">
      <Navbar>
        <div className="w-[600px] h-[250px] bg-base-300 p-4 rounded-xl">
          <Linegraph />
        </div>
      </Navbar>
    </div>
  );
};

export default Dashboard;
