import { AuthProvider } from './providers/Auth';
import ErrorBoundry from './providers/ErrorBoundry';
import { NotificationProvider } from './providers/Notification';
import { StudioProvider } from './providers/StudioProvider';
import Layout from './layouts/Layout';

const App = () => {
  return (
    <ErrorBoundry>
      <NotificationProvider>
        <AuthProvider>
          <StudioProvider>
            <Layout />
          </StudioProvider>
        </AuthProvider>
      </NotificationProvider>
    </ErrorBoundry>
  );
};

export default App;
