import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CalendarView from '../components/CalendarView';
import './MyPlanAway.css';

function MyPlanAway({ auth }) {
  return (
    <div className="overflow-scroll">
      <h1>Hello it is the MyPlanAway page</h1>
      {auth
        ? (
          <div className="flex-wrap">
            {[...new Array(12)].map((m, i) => <CalendarView month={new Date(2020, i, 1)} />)}
          </div>
        )
        : <Redirect to="/account/login" />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.isAuth,
});

MyPlanAway.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MyPlanAway);
