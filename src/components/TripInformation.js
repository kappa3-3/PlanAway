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
  console.log(plan);
  return (
    <div className="trip_container">
      <h3>{plan.name}</h3>
      <p>
        Connection:
        {plan.flights.connection}
      </p>
      <p>Flights:</p>
      <span>
        Departure:
        {dateFormatter(plan.flights.out)}
      </span>
      <span>
        Return:
        {dateFormatter(plan.flights.in)}
      </span>
    </div>
  );
}

TripInformation.propTypes = {
  plan: PropTypes.objectOf().isRequired,
};

export default TripInformation;
