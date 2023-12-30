import { Outlet } from "react-router-dom";
import Controls from "../components/Controls/Controls";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";

const AdminLayout = () => {
  return (
    <div className="body_wrapper home-page admin-page dark-mode">
      <Menu />
      <Controls />
      <div className="main-content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
