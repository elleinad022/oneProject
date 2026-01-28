import React from "react";
import Navbar from "../components/Navbar";
import Linegraph from "../components/Linegraph";
import Doughnutgraph from "../components/Doughnutgraph";
import Bargraph from "../components/Bargraph";
import BodyWeight from "../components/BodyWeight";
import Water from "../components/Water";
import FeaturedMeals from "../components/featuredMeals";

const Dashboard = () => {
  return (
    <div>
      <Navbar>
        <div className="grid grid-cols-4  gap-3 w-full h-full">
          <div className="col-span-2 flex flex-col max-w-3xl gap-y-5 bg-base-300 p-4 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Doughnutgraph />
              <Bargraph />
            </div>
            <div className="w-full">
              <Linegraph />
            </div>
          </div>
          <div className="max-w-lg bg-base-300 p-4 rounded-xl flex flex-col items-center justify-center">
            <BodyWeight />
          </div>
          <div className="flex flex-col gap-y-3 h-full">
            <div className="max-w-lg h-1/2 bg-base-300 p-4 rounded-xl">
              <Water />
            </div>
            <div className="max-w-lg h-1/2 bg-base-300 p-4 rounded-xl overflow-auto">
              <FeaturedMeals />
            </div>
          </div>
          <div className="col-span-3 bg-base-300">
            <Water></Water>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Dashboard;
