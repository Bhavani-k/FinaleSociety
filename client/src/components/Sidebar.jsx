import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineClose, MdMenu, MdOutlineDashboard } from "react-icons/md";
import { FiHome, FiActivity, FiLogIn } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import * as AuthActions from "../store/auth/actions";

const Sidebar = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = (data) => dispatch(AuthActions.signOut(data));
  const auth = useSelector((state) => state.auth);

  const { id } = useParams();

  const toggleSidebar = () => {
    setCollapsed(!isCollapsed);
    // Additional logic for toggling sidebar
  };

  const handleLogOut = () => {
    signOut();
  };

  useEffect(() => {
    if (auth?.signOutSuccess === true) {
      navigate("/");
    }
  }, [auth?.signOutSuccess]);

  return (
    <div
      className={`text-gray-600 h-screen bg-primary p-4 text-md font-semibold gap-5 flex flex-col justify-between ${
        isCollapsed ? "w-16 " : "w-52 "
      } transition-all`}
    >
      {isCollapsed ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="mb-4 flex items-center text-white justify-between">
              <button onClick={toggleSidebar} className="text-white">
                <MdMenu />
              </button>
            </div>
            {/* <Link to={`/${id}`} className="text-white flex items-center mb-2">
              <MdOutlineDashboard className="mr-2" />
            </Link> */}
            <Link
              to={`/${id}/activityList`}
              className="text-white flex items-center mb-2"
            >
              <FiActivity className="mr-2" />
            </Link>
            <Link
              to={`/${id}/familyList`}
              className="text-white flex items-center mb-2"
            >
              <FiHome className="mr-2" />
            </Link>
          </div>
          <div>
            <Link to={`/${id}/login`} className="text-white flex items-center">
              <FiLogIn className="mr-2" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="mb-4 flex items-center text-white justify-between">
              <Link className="font-bold" to={`/${id}`}>
                DSCE
              </Link>{" "}
              <button onClick={toggleSidebar} className="text-white">
                <MdOutlineClose />
              </button>
            </div>
            {/* <Link to={`/${id}/`} className="text-white flex items-center mb-2">
              <MdOutlineDashboard className="mr-2" />
              Dashboard
            </Link> */}
            <Link
              to={`/${id}/activityList`}
              className="text-white flex items-center mb-2"
            >
              <FiActivity className="mr-2" />
              Activities
            </Link>
            <Link
              to={`/${id}/familyList`}
              className="text-white flex items-center mb-2"
            >
              <FiHome className="mr-2" />
              Families
            </Link>
          </div>
          <div>
            <p onClick={handleLogOut} className="text-white flex items-center">
              <FiLogIn className="mr-2" />
              Log out
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
