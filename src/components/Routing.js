import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import MyPlanAway from '../pages/MyPlanAway';
import FetchedFlights from '../pages/FetchedFlights';

function Routing({ data, auth }) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/myplanaway">
        {auth ? <MyPlanAway /> : <Redirect to="/account/login" />}
      </Route>
      <Route exact path="/profile">
        {auth ? <Profile /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/account/login" component={Login} />
      <Route exact path="/account/signup" component={Signup} />
      <Route exact path="/flights">
        {data.Quotes ? <FetchedFlights /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state) => ({
  data: state.flightsData,
  auth: state.isAuth,
});

Routing.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  auth: PropTypes.bool.isRequired,
};

Routing.defaultProps = {
  data: [],
};

export default connect(mapStateToProps)(Routing);
