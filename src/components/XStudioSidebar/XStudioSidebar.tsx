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
import { TypeList } from "../DropDown/DropDown";
import { useStudio } from "../../providers/StudioProvider";
const DropDown = React.lazy(() => import("../DropDown/DropDown"));
type XStudioSidebarProps = {
  search: React.ReactNode;
};
const XStudioSidebar = ({ search }: XStudioSidebarProps) => {
  const studio = useStudio();
  const auth = useAuth();
  const profileMenu: TypeList[] = [
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
        onClick={(e) => {
          e.preventDefault();
          studio.sidebar.toggle();
        }}
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
        <span className="x-tooltip x-tooltip-dark x-tooltip-right x-tooltip-up-right-sm">
          Add Project
        </span>
      </NavLink>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
        }}
        className="side-icon"
        data-table-tooltip="true"
      >
        <span className="x-tooltip x-tooltip-dark x-tooltip-right  x-tooltip-up-right-sm">
          Search
        </span>
        {search}
      </a>
      <NavLink
        to="/admin/manage-project"
        className="side-icon"
        data-table-tooltip="true"
      >
        <span className="x-tooltip x-tooltip-dark x-tooltip-right  x-tooltip-up-right-sm">
          Manage Projects
        </span>
        <ImportIcon />
      </NavLink>
      <a href="#" className="side-icon" data-table-tooltip="true">
        <ThemeIcon />
        <span className="x-tooltip x-tooltip-dark x-tooltip-right  x-tooltip-up-right-sm">
          Customize
        </span>
      </a>
      <div className="dropdown-divider"></div>
      <NavLink
        to="/my-settings"
        className="side-icon"
        data-table-tooltip="true"
      >
        <SettingsIcon />
        <span className="x-tooltip x-tooltip-dark x-tooltip-right  x-tooltip-up-right-sm">
          Settings
        </span>
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
