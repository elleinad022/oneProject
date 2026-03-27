import React from "react";
import AtomicBackground from "../components/AtomicBackground";
import Navbar from "../components/Navbar";
import Linegraph from "../components/Linegraph";
import Doughnutgraph from "../components/Doughnutgraph";
import Bargraph from "../components/Bargraph";
import BodyWeight from "../components/BodyWeight";
import Water from "../components/Water";
import FeaturedMeals from "../components/featuredMeals";
import WorkoutPlan from "../components/WorkoutPlan";
import PersonalRecords from "../components/PersonalRecords";

const Dashboard = () => {
  return (
    <div>
      <Navbar>
        <AtomicBackground />

        <div className="p-4 min-h-0 xl:h-full">
          <div className="grid grid-cols-2 xl:grid-cols-4 xl:grid-rows-[auto_1fr] gap-3 w-full h-full">
            {/* LEFT */}
            <div className="col-span-2 xl:col-span-2 flex flex-col min-w-0 w-full gap-y-5 bg-base-300 p-4 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">
                <Doughnutgraph />
                <Bargraph />
              </div>
              <div className="min-w-0">
                <Linegraph />
              </div>
            </div>

            {/* BODY WEIGHT */}
            <div className="min-w-0 bg-base-300 p-4 rounded-xl flex items-center justify-center">
              <BodyWeight />
            </div>

            {/* WATER + MEALS */}
            <div className="flex flex-col gap-3 h-auto w-full xl:w-auto xl:h-full">
              <div className="bg-base-300 p-4 rounded-xl">
                <Water />
              </div>
              <div className="bg-base-300 p-4 rounded-xl xl:flex-1 overflow-auto min-h-0">
                <FeaturedMeals />
              </div>
            </div>

            {/* WORKOUT */}
            <div className="col-span-2 xl:col-span-3 bg-base-300 rounded-xl xl:overflow-y-auto min-h-0">
              <WorkoutPlan />
            </div>

            {/* RECORDS */}
            <div className="col-span-2 xl:col-span-1 bg-base-200 rounded-xl min-w-0 min-h-0 xl:overflow-y-auto">
              <PersonalRecords />
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Dashboard;
