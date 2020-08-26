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
      {(plan.flights.length > 0)
        ? (
          <div className="trip_details_wrapper">
            {plan.flights.map((flight) => (
              <>
                <p>
                  <span>Connection:</span>
                </p>
                <p>
                  <span>{flight.connection}</span>
                </p>
                <p>Flights:</p>
                <p>
                  <span>Departure:</span>
                  <span>{dateFormatter(flight.out)}</span>
                </p>
                <p>
                  <span>Return:</span>
                  <span>{dateFormatter(flight.in)}</span>
                </p>
              </>
            ))}
          </div>
        ) : <p className="trip_details_wrapper">No flights added yet.</p>}
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
