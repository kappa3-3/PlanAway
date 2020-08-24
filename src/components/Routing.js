import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import MyPlanAway from '../pages/MyPlanAway';
import FetchedFlights from '../pages/FetchedFlights';

function Routing({ data }) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/myplanaway" component={MyPlanAway} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/account/login" component={Login} />
      <Route exact path="/account/signup" component={Signup} />
      <Route exact path="/flights">
        {data ? <FetchedFlights /> : ('loading..')}
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state) => ({
  data: state.flightsData,
});

Routing.propTypes = {
  data: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(Routing);
