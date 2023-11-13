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

import Dashboard from "./Pages/Admin/Dashboard";
import MainLayout from "./Components/Admin/MainLayout";
import User from "./Pages/Admin/UserAdmin/User";

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
