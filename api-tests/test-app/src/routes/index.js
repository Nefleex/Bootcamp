import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Login/Home";
import TvGuide from "../components/TvGuide/TvGuide";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { PrivateRoute } from ".././components/PrivateRoute";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/tvguide" component={TvGuide} /> */}
      <Route exact path="/register" component={RegisterForm} />
      <PrivateRoute exact path="/tvguide" component={TvGuide} />
      <Route path="*" component={() => "404: Not a valid website"} />
    </Switch>
  </BrowserRouter>
);
