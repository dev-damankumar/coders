import { NavLink, useLocation } from "react-router-dom";
import SiteLogo from "../../assets/icons/SiteLogo";
import { excludeFromPaths } from "../../helpers";

const Footer = () => {
  const path = useLocation().pathname;
  let showFooter = true;
  const excludingPaths = [
    "xcode",
    "forgot-password",
    "reset",
    "register",
    "file-preview",
    "login",
    "admin/login",
    "project-detail",
    "x-studio",
  ];

  if (excludeFromPaths(excludingPaths, path)) {
    showFooter = false;
  }
  return (
    showFooter && (
      <section className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <NavLink className="navbar-brand footer-logo" to="/">
                <SiteLogo />
                <p>
                  Project <span>X</span>
                </p>
              </NavLink>
            </div>
            <div className="col-md-6">
              <p className="find-p">
                ProjectX is great tool to manage and develop your project. you
                will get one touch access to your each project and can easily
                manage and customize that project and even you can decide what
                to show to public and what to not. Get you integrated In-Build
                Code editor to easily edit your code on the go and see the
                change live instantly.
              </p>
              <div className="footer-input-wrap">
                <div className="search-div">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-search"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="10" cy="10" r="7"></circle>
                    <line x1="21" y1="21" x2="15" y2="15"></line>
                  </svg>
                  <input
                    className="form-input search-question"
                    type="text"
                    placeholder="Search a question..."
                  />
                </div>
                <button type="button" className="btn btn-primary inc-btn">
                  Search <i className="bx bx-right-arrow-alt"></i>
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="iframe-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13590.662992618576!2d74.8624088!3d31.615617499999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1641377255338!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="social-row row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="social-icons">
                <div className="social-wrap">
                  <p>Follow me on</p>
                  <div className="social-icon-wrap">
                    <a
                      href="https://www.youtube.com/channel/UCtDnpqvWx-rs3h_X5ihDmbw"
                      target="_blank"
                      className="youtube"
                    >
                      <i className="bx bxl-youtube"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/daman-kumar-022b731b9"
                      target="_blank"
                      className="linkedin"
                    >
                      <i className="bx bxl-linkedin"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/damankumar.pb_02/"
                      target="_blank"
                      className="instagram"
                    >
                      <i className="bx bxl-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copy-row row">
            <div className="col-sm-6">
              <p>ProjectX {new Date().getFullYear()} | All Rights Reserved</p>
            </div>
            <div className="col-sm-6">
              <p className="terms">
                &copy; Copyright {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Footer;
