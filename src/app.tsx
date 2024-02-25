import { AuthProvider } from './providers/Auth';
import ErrorBoundry from './providers/ErrorBoundry';
import { NotificationProvider } from './providers/Notification';
import { StudioProvider } from './providers/StudioProvider';
import Layout from './layouts/Layout';
import { ProjectProvider } from './providers/ProjectProvider';

const App = () => {
  return (
    <ErrorBoundry>
      <NotificationProvider>
        <AuthProvider>
          <ProjectProvider>
            <StudioProvider>
              <Layout />
            </StudioProvider>
          </ProjectProvider>
        </AuthProvider>
      </NotificationProvider>
    </ErrorBoundry>
  );
};

export default App;
