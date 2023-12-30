import React, { Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const Home = React.lazy(() => import("../pages/Home/Home"));
const AllProjects = React.lazy(
  () => import("../pages/AllProjects/AllProjects")
);
const ProjectDetail = React.lazy(
  () => import("../pages/ProjectDetail/ProjectDetail")
);
const Xcode = React.lazy(() => import("../pages/Xcode/Xcode"));
const FilePreview = React.lazy(
  () => import("../pages/FilePreview/FilePreview")
);
const Login = React.lazy(() => import("../pages/Login/Login"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
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

function UserRoutes() {
  return (
    <>
      <Route
        path=""
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      ></Route>
      {/* <Route
        path="all-projects"
        element={
          <Suspense fallback={<Loading />}>
            <AllProjects />
          </Suspense>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      ></Route>
      <Route path="profile/:id">
        <Suspense fallback={<Loading />}>
          <PublicProfile tab={"profile"} />
        </Suspense>
      </Route>
      <Route
        path="profile"
        element={
          <Suspense fallback={<Loading />}>
            <Profile tab={"profile"} />
          </Suspense>
        }
      ></Route>

      <Route
        path="my-project"
        element={
          <Suspense fallback={<Loading />}>
            <Profile tab={"my-project"} />
          </Suspense>
        }
      ></Route>
      <Route
        path="my-settings"
        element={
          <Suspense fallback={<Loading />}>
            <Profile tab={"my-settings"} />
          </Suspense>
        }
      ></Route>

      <Route
        path="project-detail/:id"
        element={
          <Suspense fallback={<Loading />}>
            <ProjectDetail />
          </Suspense>
        }
      ></Route>
      <Route path="xcode/:id">
        <Suspense fallback={<Loading />}>
          <Xcode />
        </Suspense>
      </Route>
      <Route
        path="file-preview"
        element={
          <Suspense fallback={<Loading />}>
            <FilePreview />
          </Suspense>
        }
      ></Route>
      <Route path="login" element={<Login />}></Route>

      <Route
        path="register/"
        element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        }
      ></Route>
      <Route path="pricing">
					<Suspense fallback={<Loading/>}>
						<Pricing/>
					</Suspense>
				</Route>
      <Route
        path="/forgot-password"
        element={
          <Suspense fallback={<Loading />}>
            <ForgotPassword />
          </Suspense>
        }
      ></Route>
      <Route
        path="/reset-password/:id"
        element={
          <Suspense fallback={<Loading />}>
            <ResetPassword />
          </Suspense>
        }
      ></Route>
      <Route
        path="/register/"
        element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        }
      ></Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      ></Route> */}
    </>
  );
}

export default UserRoutes;
