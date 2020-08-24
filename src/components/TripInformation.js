import React from 'react';
import PropTypes from 'prop-types';

function TripInformation(plan) {
  const dateFormatter = (date) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };
  return (
    <>
      {plan.out
        ? (
          <div className="trip_container">
            <h1>
              Connection:
              {plan.connection}
            </h1>
            <p>Flights:</p>
            <h3>
              Departure:
              {dateFormatter(plan.out)}
            </h3>
            <h3>
              Return:
              {dateFormatter(plan.in)}
            </h3>
          </div>
        ) : ''}
    </>
  );
}

TripInformation.propTypes = {
  plan: PropTypes.objectOf().isRequired,
};

export default TripInformation;
