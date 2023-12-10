import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
import "./App.css";
import AdminRoute from "./Route/AdminRoute";
import Home from "./Pages/Home/Home";
import PrevFilterContext from "./context/PrevFilterContext";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import AccountBooking from "./Pages/AccountSetting/AccountBooking";
import AccountMemory from "./Pages/AccountSetting/AccountMemory";
import AccountSetting from "./Pages/AccountSetting";
import LogOut from "./Pages/Logout";
import PageNotFound from "./Pages/PageNotFound";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

import Dashboard from "./Pages/Admin/Dashboard";
import MainLayout from "./Components/Admin/MainLayout";
import User from "./Pages/Admin/UserAdmin/User";
import Classroom from "./Pages/Classroom";
import CreateClass from "./Pages/Classroom/Components/CreateClass";
import ClassJoining from "./Pages/JoinClassroom/ClassJoining";
import DetailClass from "./Pages/Classroom/Components/DetailClass";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <PrevFilterContext>
            <Switch>
              <Route path="/" exact>
                <AppLayout>
                  <Home />
                </AppLayout>
              </Route>
              <Route path="/account/bookings" exact>
                <AppLayout>
                  <AccountBooking />
                </AppLayout>
              </Route>
              <Route path="/account/memory" exact>
                <AppLayout>
                  <AccountMemory />
                </AppLayout>
              </Route>
              <Route path="/account" exact>
                <AppLayout>
                  <AccountSetting />
                </AppLayout>
              </Route>
              <Route path="/classroom" exact>
                <AppLayout>
                  <Classroom />
                </AppLayout>
              </Route>
              <Route path="/classroom/:id/join/link" exact>
                <AppLayout>
                  <ClassJoining/>
                </AppLayout>
              </Route>
              <Route path="/classroom/:id" exact>
                <AppLayout>
                  <DetailClass />
                </AppLayout>
              </Route>
              <Route path="/create-class" exact>
                <AppLayout>
                  <CreateClass />
                </AppLayout>
              </Route>
              <AdminRoute path="/dashboard" exact>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </AdminRoute>
              <AdminRoute path="/admin/user" exact>
                <MainLayout>
                  <User />
                </MainLayout>
              </AdminRoute>
              <Route path="/sign-up">
                <AppLayout>
                  <Signup />
                </AppLayout>
              </Route>
              <Route path="/sign-in" exact>
                <AppLayout>
                  <Signin />
                </AppLayout>
              </Route>
              <Route path="/logout">
                <AppLayout>
                  <LogOut />
                </AppLayout>
              </Route>
              <Route path="/forgot-password">
                <AppLayout>
                  <ForgotPassword />
                </AppLayout>
              </Route>
              <Route path="/activenewpass">
                <AppLayout>
                  <ResetPassword />
                </AppLayout>
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </PrevFilterContext>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
