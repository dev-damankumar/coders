import { Outlet } from 'react-router-dom';
import Controls from '../components/ui/Controls';
import Menu from '../components/ui/Menu/Menu';
import Footer from '../components/ui/Footer/Footer';

const AdminLayout = () => {
  return (
    <main className='admin-wrapper dark-mode'>
      <Menu />
      <Controls />
      <div className='main-content-wrapper'>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default AdminLayout;
