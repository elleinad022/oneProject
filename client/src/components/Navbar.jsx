import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useGetTodayCaloriesQuery } from "../slices/caloriesApiSlice";
import { apiSlice } from "../slices/apiSlice";

const Navbar = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const [preview, setPreview] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: calData, isLoading } = useGetTodayCaloriesQuery();
  const dailyGoal = userInfo?.dailyCalorieGoal ?? 0;
  const caloriesConsumed = calData?.todayLog?.caloriesConsumed ?? 0;
  const caloriesLeft = dailyGoal - caloriesConsumed;
  const caloriesLeftText =
    caloriesLeft >= 0
      ? `${caloriesLeft} kcal left`
      : `Over by ${caloriesLeft} kcal`;

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen overflow-hidden justify-center items-center">
        {/* Page content here */}
        <main className="flex-1 overflow-auto min-h-0">{children}</main>

        <div className="w-full flex justify-center items-center">
          <label
            htmlFor="my-drawer-3"
            className="btn btn-block backdrop-blur-md drawer-button lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <ul className="menu menu-lg bg-base-200 min-h-full w-80 p-4 flex flex-col justify-between">
          {/* Sidebar content here */}
          <div>
            <h1 className="text-4xl mb-7 font-bold text-center cursor-default">
              ONE Project
            </h1>

            <li>
              <Link to="/" className="py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm0 8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1zm1-17a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/workout" className="py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6 5v14h3v-6h6v6h3V5h-3v6H9V5zM3 15a1 1 0 0 0 1 1h1V8H4a1 1 0 0 0-1 1v2H2v2h1zm18-6a1 1 0 0 0-1-1h-1v8h1a1 1 0 0 0 1-1v-2h1v-2h-1z"></path>
                </svg>
                Workout
              </Link>
            </li>
            <li>
              <Link to="/nutrition" className="py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 2048 2048">
                  <path
                    fill="#fff"
                    d="M1668 129h124v1919H256V129h126V0h128v129h258V0h128v129h258V0h128v129h258V0h128zm-4 1791V257H384v1663zM1408 513v128H640V513zM640 1666v-128h768v128zm0-513v-128h768v128z"
                  />
                </svg>
                Nutrition
              </Link>
            </li>

            <li>
              <Link to="/records" className="py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 48 48">
                  <g fill="#fff" fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M21 10a2 2 0 0 0-2 2h-3a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2h-3a2 2 0 0 0-2-2zm0 2h6v2h-6zm3.557 16l-2.493 6.649a1 1 0 1 0 1.872.702l1.259-3.355h2.61l1.259 3.355a1 1 0 1 0 1.872-.702L28.444 28h2.858a1 1 0 1 0 0-2h-10.3a1 1 0 0 0 0 2zM31 19.24H17v-2h14zM17 23.4h5v-2h-5zm11.5-.4a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
                    <path d="M39 8H9a1 1 0 0 0-1 1v30a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1M9 6a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3z" />
                  </g>
                </svg>
                Records
              </Link>
            </li>
            <li>
              <Link to="/settings" className="py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx={12} cy={12} r={3}></circle>
                    <path d="M13.765 2.152C13.398 2 12.932 2 12 2s-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.62 1.62 0 0 1-.79 1.353a1.62 1.62 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7s-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555c.473.297.777.803.777 1.361s-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605c.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353c.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22s1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863c.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453s.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.62 1.62 0 0 1 19.562 12c0-.558.304-1.064.777-1.36c.321-.203.529-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605c-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008a1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z"></path>
                  </g>
                </svg>
                Settings
              </Link>
            </li>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <img
                    src={
                      preview ||
                      (userInfo.profilePicture
                        ? userInfo.profilePicture.startsWith("http")
                          ? userInfo.profilePicture
                          : `${API_BASE_URL.replace(/\/$/, "")}${userInfo.profilePicture}`
                        : "/defAvatar.jpg")
                    }
                    alt="Profile"
                    className="size-24 rounded-full object-scale-down border"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">{userInfo?.name}</span>
                <span className="text-sm text-gray-400">
                  {caloriesLeftText}
                </span>
              </div>
            </div>

            <div
              className="tooltip tooltip-primary tooltip-left"
              data-tip="Log Out">
              <button
                className="text-gray-400 hover:text-primary transition-transform duration-300 transform hover:scale-110"
                onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h5.903q.214 0 .357.143t.143.357t-.143.357t-.357.143H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h5.904q.214 0 .357.143t.143.357t-.143.357t-.357.143zm12.444-7.5H9.692q-.213 0-.356-.143T9.192 12t.143-.357t.357-.143h8.368l-1.971-1.971q-.141-.14-.15-.338q-.01-.199.15-.364q.159-.165.353-.168q.195-.003.36.162l2.614 2.613q.242.243.242.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.366-.159q-.16-.165-.157-.357t.162-.35z"></path>
                </svg>
              </button>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
