import React, { Suspense } from "react";
import { Route } from "react-router-dom";

const Login = React.lazy(() => import("../pages/Login/Login"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const Profile: React.LazyExoticComponent<
  React.NamedExoticComponent<{ tab: string }>
> = React.lazy(() => import("../pages/Profile/Profile"));
const EditProject = React.lazy(
  () => import("../pages/Admin/EditProject/EditProject")
);
const XStudio = React.lazy(() => import("../pages/XStudio/XStudio"));

function AdminRoutes() {
  return (
    <>
      <Route path="/admin/edit-project/:id">
        <Suspense fallback={<div></div>}>
          <EditProject />
        </Suspense>
      </Route>
      <Route path="/admin/add-project">
        <Suspense fallback={<div></div>}>
          <Profile tab={"add-project"} />
        </Suspense>
      </Route>
      <Route path="/admin/manage-project">
        <Suspense fallback={<div></div>}>
          <Profile tab={"manage-project"} />
        </Suspense>
      </Route>
      <Route path="/admin/manage-subscription">
        <Suspense fallback={<div></div>}>
          <Profile tab={"manage-subscription"} />
        </Suspense>
      </Route>
      <Route path="/x-studio/:id">
        <Suspense fallback={<div></div>}>
          <XStudio />
        </Suspense>
      </Route>
      <Route path="/x-studio">
        <Suspense fallback={<div></div>}>
          <XStudio />
        </Suspense>
      </Route>

      <Route path="/admin">
        <Suspense fallback={<div></div>}>
          <NotFound />
        </Suspense>
      </Route>
      <Route path="/login">
        <Suspense fallback={<div></div>}>
          <Login />
        </Suspense>
      </Route>
      <Route path="/admin">
        <Suspense fallback={<div></div>}>
          <NotFound />
        </Suspense>
      </Route>
    </>
  );
}

export default AdminRoutes;
