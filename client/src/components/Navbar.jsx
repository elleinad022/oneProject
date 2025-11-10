import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
          Open drawer
        </label>
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
              <a className="py-5">
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
              </a>
            </li>
            <li>
              <a className="py-5">
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
              </a>
            </li>
            <li>
              <a className="py-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 14 14">
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth={1}>
                    <path d="M7.014 13.301c-5.474 0-7.203-1.702-6.206-4.78H13.22c.997 3.078-.732 4.78-6.206 4.78Z"></path>
                    <path
                      strokeLinecap="round"
                      d="M4.23 4.279C5.335 5.704 5.726 7.14 5.883 8.494"></path>
                    <path
                      strokeLinecap="round"
                      d="M1.368 8.515c-.6-1.275-.41-2.746.423-3.473a3.7 3.7 0 0 1-.34-.578c-.698-1.482-.295-3.14.9-3.704C3.549.196 5.085.94 5.783 2.422q.146.313.23.63c.992-.163 2.092.426 2.735 1.493l.187.363"></path>
                    <path
                      strokeLinecap="round"
                      d="M7.661 8.389h5.252q.123-.444.124-.988c0-1.76-.99-2.75-2.75-2.75s-2.75.99-2.75 2.75q0 .544.124.988"></path>
                  </g>
                </svg>
                Diet
              </a>
            </li>
            <li>
              <a className="py-5">
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
              </a>
            </li>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span>USER</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">{userInfo?.name}</span>
                <span className="text-sm text-gray-400">Cal. Left</span>
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
