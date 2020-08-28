import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CalendarView from '../components/CalendarView';
import TripInformation from '../components/TripInformation';
import './MyPlanAway.css';

function MyPlanAway({
  auth, plans,
}) {
  const tripDates = plans.map(({ flights }, i) => ({ className: `tile-bg-${i}`, out: flights[0].out, in: flights[0].in }));
  const tripInfo = plans.map(({ name, flights }, i) => ({ name, className: `tile-bg-${i}`, flights }));
  return (
    <div>
      <h3 className="yearly-title">Yearly overview</h3>
      <div className="overflow-scroll">
        {auth
          ? (
            <div className="flex">
              {[...Array(12).keys()].map((m) => (
                <CalendarView
                  key={`month-${m}`}
                  month={new Date(2020, m, 1)}
                  tripDates={tripDates}
                />
              ))}
            </div>
          )
          : <Redirect to="/account/login" />}
      </div>
      <div className="flex-wrap">
        {tripInfo.map((plan) => (
          <TripInformation
            plan={plan}
            key={plan.name}
          />
        ))}
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
  plans: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
  ])).isRequired,
};

export default connect(mapStateToProps)(MyPlanAway);
