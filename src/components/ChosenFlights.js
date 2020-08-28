import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import dateFormatter from '../assets/functions/dateFormatter';
import { setUserData } from '../actions/userData';
import '../pages/FetchedFlights.css';

const ChosenFlights = ({ trip, id, updateUser }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleRetrieveFromDB = () => {
    fetch('/.netlify/functions/update', {
      method: 'POST',
      body: JSON.stringify({ id }),
    }).then((res) => res.json())
      .then((res) => {
        if (res !== null) updateUser(res);
      });
  };
  const handleSavingToDatabase = (res) => {
    const { matchedCount, modifiedCount } = res;
    setIsSaved(matchedCount === 1 && modifiedCount === 1);
    if (matchedCount === 1 && modifiedCount === 1) handleRetrieveFromDB();
  };

  const saveToDatabase = (e, flight) => {
    e.preventDefault();
    const button = e.target;
    button.innerHTML = `SAVED TO ${trip.currentTrip.toUpperCase()}`;
    fetch('/.netlify/functions/flights', {
      method: 'POST',
      body: JSON.stringify({
        id, flight, name: trip.currentTrip,
      }),
    }).then((res) => res.json())
      .then((res) => handleSavingToDatabase(res));
  };

  return (
    <div className="chosen-flights-wrapper">
      <h2>Chosen flights:</h2>
      {trip.flights
        ? (
          <>
            {trip.flights.map((flight) => (
              <div>
                <h3>{flight.connection}</h3>
                <p>
                  price: €
                  {flight.price}
                </p>
                <p>
                  Departure:
                  {dateFormatter(flight.out)}
                  (
                  {flight.carrierIn}
                  )
                </p>
                <p>
                  Arrival:
                  {dateFormatter(flight.in)}
                  (
                  {flight.carrierOut}
                  )
                </p>
                <button
                  type="button"
                  className="saveToDbButton"
                  disabled={isSaved}
                  onClick={(e) => saveToDatabase(e, flight)}
                >
                  {trip.currentTrip.toUpperCase()}
                  <AddIcon style={{ color: 'white' }} />
                </button>
              </div>
            ))}
          </>
        ) : ''}
    </div>
  );
};

const mapStateToProps = (state) => ({
  trip: state.tripsData,
  id: state.userData._id,
});

ChosenFlights.propTypes = {
  trip: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
  id: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { updateUser: setUserData })(ChosenFlights);
