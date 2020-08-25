import React from 'react';
import PropTypes from 'prop-types';

function TripInformation({ plan }) {
  const dateFormatter = (date) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };
  return (
    <div className="trip_container">
      <h3 className={`trip_title ${plan.className}`}>{plan.name}</h3>
      <div className="trip_details_wrapper">
        <p>
          <span>Connection:</span>
        </p>
        <p>
          <span>{plan.connection}</span>
        </p>
        <p>Flights:</p>
        <p>
          <span>Departure:</span>
          <span>{dateFormatter(plan.out)}</span>
        </p>
        <p>
          <span>Return:</span>
          <span>{dateFormatter(plan.in)}</span>
        </p>
      </div>
    </div>
  );
}

TripInformation.propTypes = {
  plan: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default TripInformation;
