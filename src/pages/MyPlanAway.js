import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserData } from '../actions/userData';
import CalendarView from '../components/CalendarView';
import TripInformation from '../components/TripInformation';
import './MyPlanAway.css';

function MyPlanAway({
  auth, plans, id, updateUser,
}) {
  useEffect(() => {
    fetch('/.netlify/functions/users', {
      method: 'POST',
      body: JSON.stringify(id),
    }).then((res) => res.json())
      .then((res) => {
        if (res !== null) updateUser(res);
      });
  }, []);

  const tripDates = plans.map(({ start_date, end_date }, i) => ({ className: `tile-bg-${i}`, start_date, end_date }));
  const tripInfo = plans.map(({ name, flights }, i) => ({ name, className: `tile-bg-${i}`, flights }));
  return (
    <div>
      <h3 className="yearly-title">Yearly overview</h3>
      <div className="overflow-scroll">
        {auth
          ? (
            <div className="flex">
              {[...new Array(12)].map((m, i) => (
                <CalendarView
                  key={m}
                  month={new Date(2020, i, 1)}
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
  id: state.userData._id,
});

MyPlanAway.propTypes = {
  auth: PropTypes.bool.isRequired,
  plans: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
  ])).isRequired,
  id: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { updateUser: setUserData })(MyPlanAway);
