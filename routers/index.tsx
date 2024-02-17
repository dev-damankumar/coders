import React, { Suspense } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from '../src/layouts/Layout';
import Loading from '../src/components/ui/Loading';

const Home = React.lazy(() => import('../src/pages/Home/Home'));
const ProjectDetail = React.lazy(
  () => import('../src/pages/ProjectDetail/ProjectDetail')
);
const Xcode = React.lazy(() => import('../src/pages/Xcode/Xcode'));
const FilePreview = React.lazy(
  () => import('../src/pages/FilePreview/FilePreview')
);
const Login = React.lazy(() => import('../src/pages/Login/Login'));
const NotFound = React.lazy(() => import('../src/pages/NotFound/NotFound'));
const Profile = React.lazy(() => import('../src/pages/Profile/Profile'));
const Register = React.lazy(() => import('../src/pages/Register/Register'));
const ForgotPassword = React.lazy(
  () => import('../src/pages/ForgotPassword/ForgotPassword')
);
const ResetPassword = React.lazy(
  () => import('../src/pages/ResetPassword/ResetPassword')
);
const PublicProfile = React.lazy(
  () => import('../src/pages/PublicProfile/PublicProfile')
);
const AllProjects = React.lazy(
  () => import('../src/pages/AllProjects/AllProjects')
);
const EditProject = React.lazy(
  () => import('../src/pages/Admin/EditProject/EditProject')
);

const Xstudio = React.lazy(() => import('../src/pages/XStudio/XStudio'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route
          path=''
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='all-projects'
          element={
            <Suspense fallback={<Loading />}>
              <AllProjects />
            </Suspense>
          }
        />
        <Route
          path='login'
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path='register'
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path='forgot-password'
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path='reset-password/:id'
          element={
            <Suspense fallback={<Loading />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path='profile'
          element={
            <Suspense fallback={<Loading />}>
              <Profile tab='profile' />
            </Suspense>
          }
        />
        <Route
          path='profile/:id'
          element={
            <Suspense fallback={<Loading />}>
              <PublicProfile tab='profile' />
            </Suspense>
          }
        />
        <Route
          path='x-studio'
          element={
            <Suspense fallback={<Loading />}>
              <Xstudio />
            </Suspense>
          }
        />
        <Route
          path='x-studio/:id'
          element={
            <Suspense fallback={<Loading />}>
              <Xstudio />
            </Suspense>
          }
        />
        <Route
          path='my-project'
          element={
            <Suspense fallback={<Loading />}>
              <Profile tab={'my-project'} />
            </Suspense>
          }
        />
        <Route
          path='my-settings'
          element={
            <Suspense fallback={<Loading />}>
              <Profile tab={'my-settings'} />
            </Suspense>
          }
        />

        <Route
          path='project-detail/:id'
          element={
            <Suspense fallback={<Loading />}>
              <ProjectDetail />
            </Suspense>
          }
        />
        <Route
          path='xcode/:id'
          element={
            <Suspense fallback={<Loading />}>
              <Xcode />
            </Suspense>
          }
        />
        <Route
          path='file-preview/:id'
          element={
            <Suspense fallback={<Loading />}>
              <FilePreview />
            </Suspense>
          }
        />
        <Route
          path='admin/add-project'
          element={
            <Suspense fallback={<Loading />}>
              <Profile tab={'add-project'} />
            </Suspense>
          }
        />
        <Route
          path='admin/edit-project/:id'
          element={
            <Suspense fallback={<Loading />}>
              <EditProject />
            </Suspense>
          }
        />
        <Route
          path='admin/manage-project'
          element={
            <Suspense fallback={<Loading />}>
              <Profile tab={'manage-project'} />
            </Suspense>
          }
        />
        <Route
          path='admin/manage-subscription'
          element={
            <Suspense fallback={<Loading />}>
              <Profile tab={'manage-subscription'} />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </>
  )
);

export default router;