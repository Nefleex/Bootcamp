import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Login/Home";
import TvGuide from "../components/TvGuide/TvGuide";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import ProtectedRoute from "../components/ProtectedRoute";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={RegisterForm} />
      <Route path="/tvguide" component={ProtectedRoute(TvGuide)} />
      <Route path="*" component={() => "404: Not a valid website"} />
    </Switch>
  </BrowserRouter>
);
