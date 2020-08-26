import React from 'react';
import PropTypes from 'prop-types';
import dateFormatter from '../assets/functions/dateFormatter';

function TripInformation({ plan }) {
  return (
    <div className="trip_container">
      <h3 className={`trip_title ${plan.className}`}>{plan.name}</h3>
      {(plan.flights.length > 0)
        ? (
          <div className="trip_details_wrapper">
            {plan.flights.map((flight) => (
              <div key={flight.connection}>
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
              </div>
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
    PropTypes.array,
  ])).isRequired,
};

export default TripInformation;
