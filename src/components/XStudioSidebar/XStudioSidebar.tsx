import React, { Suspense } from "react";
import SiteLogo from "../../assets/icons/SiteLogo";
import sideImg from "../../assets/images/sidebar-icon.png";
import { NavLink } from "react-router-dom";
import AddIcon from "../../assets/icons/AddIcon";
import SearchIconWhite from "../../assets/icons/SearchIconWhite";
import ImportIcon from "../../assets/icons/ImportIcon";
import ThemeIcon from "../../assets/icons/ThemeIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import UndoIcon from "../../assets/icons/UndoIcon";
import { useAuth } from "../../providers/Auth";
import { env } from "../../utils";
const DropDown = React.lazy(() => import("../DropDown/DropDown"));
const XStudioSidebar = ({ openSidebar, setShowSearchFeild }) => {
  let auth = useAuth();
  let profileMenu = [
    {
      name: "My Profile",
      icon: auth?.user?.image ? (
        <img src={`${env["REACT_APP_BASE_URL"]}${auth?.user?.image}`} />
      ) : (
        <ProfileIcon />
      ),
      link: "/profile",
    },
    {
      name: "My Settings",
      icon: <SettingsIcon />,
      link: "/my-settings",
    },
    "divider",
    {
      name: "Logout",
      icon: <UndoIcon />,
      onClick: auth.logout,
    },
  ];
  return (
    <div className="x-studio-sidebar">
      <a
        href="/"
        className="side-icon logo-x-studio-link"
        data-table-tooltip="true"
      >
        <SiteLogo />
      </a>
      <div className="dropdown-divider"></div>
      <a
        href="#"
        onClick={openSidebar}
        className="side-icon sidebar-open-icon"
        data-table-tooltip="true"
      >
        <img src={sideImg} />
      </a>
      <NavLink
        to="/admin/add-project"
        className="side-icon"
        data-table-tooltip="true"
      >
        <AddIcon />
        <div className="x-tooltip x-tooltip-dark x-tooltip-right x-tooltip-up-right-sm">
          Add Project
        </div>
      </NavLink>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShowSearchFeild(true);
        }}
        className="side-icon"
        data-table-tooltip="true"
      >
        <div className="x-tooltip x-tooltip-dark x-tooltip-right  x-tooltip-up-right-sm">
          Search
        </div>
        <SearchIconWhite />
      </a>
      <NavLink
        to="/admin/manage-project"
        className="side-icon"
        data-table-tooltip="true"
      >
        <div className="x-tooltip x-tooltip-dark x-tooltip-right  x-tooltip-up-right-sm">
          Manage Projects
        </div>
        <ImportIcon />
      </NavLink>
      <a href="#action" className="side-icon" data-table-tooltip="true">
        <ThemeIcon />
        <div className="x-tooltip x-tooltip-dark x-tooltip-right  x-tooltip-up-right-sm">
          Customize
        </div>
      </a>
      <div className="dropdown-divider"></div>
      <NavLink
        to="/my-settings"
        className="side-icon"
        data-table-tooltip="true"
      >
        <SettingsIcon />
        <div className="x-tooltip x-tooltip-dark x-tooltip-right  x-tooltip-up-right-sm">
          Settings
        </div>
      </NavLink>
      <Suspense fallback={""}>
        <DropDown
          list={profileMenu}
          icon={<ProfileIcon />}
          name={""}
          menuClass="dark-x-studio-menu x-studio-dropdown-menu"
          className="side-icon profile-sideicon drop-up"
        />
      </Suspense>
    </div>
  );
};

export default XStudioSidebar;
