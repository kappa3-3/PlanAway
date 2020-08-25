import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CalendarView from '../components/CalendarView';
import TripInformation from '../components/TripInformation';
import './MyPlanAway.css';

function MyPlanAway({ auth, plans }) {
  const tripDates = plans.map(({ name, flights }, i) => ({ name, className: `tile-bg-${i}`, ...flights[0] }));
  return (
    <div>
      <h3 className="yearly-title">Yearly overview</h3>
      <div className="overflow-scroll">
        {auth
          ? (
            <div className="flex">
              {[...new Array(12)].map((m, i) => (
                <CalendarView
                  month={new Date(2020, i, 1)}
                  tripDates={tripDates}
                />
              ))}
            </div>
          )
          : <Redirect to="/account/login" />}
      </div>
      <div className="flex-wrap">
        {tripDates.map((plan) => <TripInformation plan={plan} />)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.isAuth,
  plans: state.userData.plans,
});

MyPlanAway.propTypes = {
  auth: PropTypes.bool.isRequired,
  plans: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(MyPlanAway);
