import React from "react";
import Navbar from "../components/Navbar";
import Linegraph from "../components/Linegraph";
import Doughnutgraph from "../components/Doughnutgraph";
import Bargraph from "../components/Bargraph";

const Dashboard = () => {
  return (
    <div>
      <Navbar>
        <div className="flex flex-col max-w-lg gap-y-5 bg-base-300 p-4 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Doughnutgraph />
            <Bargraph />
          </div>
          <div className="w-full">
            <Linegraph />
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Dashboard;
