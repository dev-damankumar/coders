import { Outlet } from 'react-router-dom';
import Menu from '../components/ui/Menu';
import Controls from '../components/ui/Controls';
import Footer from '../components/ui/Footer';
import Topbar from '../components/auth/Topbar';

const Layout = () => {
  return (
    <main className='dark-mode'>
      <Topbar />
      <Menu />
      <Controls />
      <div className='main-content-wrapper'>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
