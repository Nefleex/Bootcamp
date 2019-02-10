import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "../components/Login/Home";
import TvGuide from "../components/TvGuide/TvGuide";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import ProtectedRoute from "../components/ProtectedRoute";
import UserProfile from "../components/UserProfile";
// import Profile from "../components/Profile/Profile";

import Profile from "../components/Profile/Profile";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={RegisterForm} />

      <Route exact path="/tvguide" component={ProtectedRoute(TvGuide)} />
      <Route exact path="/profile" component={UserProfile(Profile)} />

      <Route
        path="*"
        component={() => (
          <div>
            404: Not a valid website <Link to={"/"}>TO LOGIN</Link>{" "}
          </div>
        )}
      />
    </Switch>
  </BrowserRouter>
);
