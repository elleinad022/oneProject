import React from "react";
import Loader from "./Loader";
import { useGetFeaturedMealsTodayQuery } from "../slices/featuredMealApiSlice";

const FeaturedMeals = () => {
  const { data, isLoading } = useGetFeaturedMealsTodayQuery();
  const meals = data?.meals;

  if (isLoading) {
    return (
      <div className="w-full max-w-lg h-[200px] mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="carousel w-full h-full">
      <div
        id="slide1"
        className="carousel-item relative w-full h-full flex flex-col overflow-hidden">
        <div className="pb-2">
          <h1 className="text-lg font-semibold">Featured Diet Menu</h1>
        </div>

        <div className="flex-1 min-h-0">
          <img
            src={meals?.[0]?.image}
            className="w-full h-full object-fill rounded-t-lg"
          />
        </div>

        <div className="p-4 bg-base-100 rounded-b-lg">
          <h2 className="font-semibold text-md text-primary leading-tight line-clamp-2 truncate">
            {meals?.[0]?.title}
          </h2>
          <p className="text-sm text-zinc-300">
            Ready In : {meals?.[0]?.readyInMinutes} Minutes <br /> Calories:{" "}
            {meals?.[0]?.nutrition?.calories}
          </p>
        </div>

        <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 flex justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      <div
        id="slide2"
        className="carousel-item relative w-full h-full flex flex-col overflow-hidden">
        <div className="pb-2">
          <h1 className="text-lg font-semibold">Featured Diet Menu</h1>
        </div>

        <div className="flex-1 min-h-0">
          <img
            src={meals?.[1]?.image}
            className="w-full h-full object-fill rounded-t-lg"
          />
        </div>

        <div className="p-4 bg-base-100 rounded-b-lg">
          <h2 className="font-semibold text-md text-primary leading-tight truncate line-clamp-2">
            {meals?.[1]?.title}
          </h2>
          <p className="text-sm text-zinc-300">
            Ready In : {meals?.[1]?.readyInMinutes} Minutes <br /> Calories:{" "}
            {meals?.[1]?.nutrition?.calories}
          </p>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide3"
        className="carousel-item relative w-full h-full flex flex-col overflow-hidden">
        <div className="pb-2">
          <h1 className="text-lg font-semibold">Featured Diet Menu</h1>
        </div>

        <div className="flex-1 min-h-0">
          <img
            src={meals?.[2]?.image}
            className="w-full h-full object-fill rounded-t-lg"
          />
        </div>

        <div className="p-4 bg-base-100 rounded-b-lg">
          <h2 className="font-semibold text-md text-primary leading-tight truncate line-clamp-2">
            {meals?.[2]?.title}
          </h2>
          <p className="text-sm text-zinc-300">
            Ready In : {meals?.[2]?.readyInMinutes} Minutes <br /> Calories:{" "}
            {meals?.[2]?.nutrition?.calories}
          </p>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMeals;
