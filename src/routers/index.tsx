import React, { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../layouts/Layout";
import Loading from "../components/Loading/Loading";

const Home = React.lazy(() => import("../pages/Home/Home"));
const ProjectDetail = React.lazy(
  () => import("../pages/ProjectDetail/ProjectDetail")
);
const Xcode = React.lazy(() => import("../pages/Xcode/Xcode"));
const FilePreview = React.lazy(
  () => import("../pages/FilePreview/FilePreview")
);
const Login = React.lazy(() => import("../pages/Login/Login"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const Profile: React.LazyExoticComponent<
  React.NamedExoticComponent<{ tab: string }>
> = React.lazy(() => import("../pages/Profile/Profile"));
const Register = React.lazy(() => import("../pages/Register/Register"));
const ForgotPassword = React.lazy(
  () => import("../pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = React.lazy(
  () => import("../pages/ResetPassword/ResetPassword")
);
const PublicProfile = React.lazy(
  () => import("../pages/PublicProfile/PublicProfile")
);
const AllProjects = React.lazy(
  () => import("../pages/AllProjects/AllProjects")
);

const Xstudio = React.lazy(() => import("../pages/XStudio/XStudio"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="all-projects"
          element={
            <Suspense fallback={<Loading />}>
              <AllProjects />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path="reset-password/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path="profile/:id"
          element={
            <Suspense fallback={<Loading />}>
              <PublicProfile tab={"profile"} />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<Loading />}>
              <Profile tab={"profile"} />
            </Suspense>
          }
        />
        <Route
          path="x-studio"
          element={
            <Suspense fallback={<Loading />}>
              <Xstudio />
            </Suspense>
          }
        />
        <Route
          path="x-studio/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Xstudio />
            </Suspense>
          }
        />
        <Route
          path="my-project"
          element={
            <Suspense fallback={<Loading />}>
              <Profile tab={"my-project"} />
            </Suspense>
          }
        />
        <Route
          path="my-settings"
          element={
            <Suspense fallback={<Loading />}>
              <Profile tab={"my-settings"} />
            </Suspense>
          }
        />

        <Route
          path="project-detail/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ProjectDetail />
            </Suspense>
          }
        />
        <Route
          path="xcode/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Xcode />
            </Suspense>
          }
        />
        <Route
          path="file-preview/:id"
          element={
            <Suspense fallback={<Loading />}>
              <FilePreview />
            </Suspense>
          }
        />

        <Route
          path="*"
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
