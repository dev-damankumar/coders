import { Outlet } from 'react-router-dom';
import Menu from '../components/ui/Menu/Menu';
import Controls from '../components/ui/Controls';
import Footer from '../components/ui/Footer/Footer';
import Topbar from '../components/auth/Topbar';

const Layout = () => {
  return (
    <div className='body_wrapper home-page dark-mode'>
      <Topbar />
      <Menu />
      <Controls />
      <div className='main-content-wrapper'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
