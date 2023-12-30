import { Outlet } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import Controls from "../components/Controls/Controls";
import Footer from "../components/Footer/Footer";
import Topbar from "../components/Topbar/Topbar";

const Layout = () => {
  return (
    <div className="body_wrapper home-page dark-mode">
      <Topbar />
      <Menu />
      <Controls />
      <div className="main-content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
