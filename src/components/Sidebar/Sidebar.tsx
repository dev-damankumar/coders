import React from "react";
import reactImg from "../../assets/images/react.png";

const Sidebar = (props) => {
  return (
    <div className="sidebar-wrap menu-section section form-creation-wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sidebar">
              <div className="side-header">
                <p>Project List 1</p>
                <a href="#action" className="closeSidebar">
                  <i className="bx bx-x" />
                </a>
              </div>
              <input
                type="text"
                className="form-input"
                placeholder="Search..."
                alt="image"
              />
              <ul>
                <li>
                  <a href="#action">
                    <img src={reactImg} className="sidebar-img" alt="vie" />{" "}
                    Vidgo Project
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
