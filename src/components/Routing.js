import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import MyPlanAway from '../pages/MyPlanAway';
import FetchedFlights from '../pages/FetchedFlights';

export default function Routing() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/myplanaway" component={MyPlanAway} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/account/login" component={Login} />
      <Route exact path="/account/signup" component={Signup} />
      <Route exact path="/flights" component={FetchedFlights} />
    </Switch>
  );
}
