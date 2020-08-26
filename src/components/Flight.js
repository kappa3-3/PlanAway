import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import FilledIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { addConnection } from '../actions/trips';
import './Flight.css';

const Flight = ({
  carrierIn, isDirect, carrierOut, price,
  departurePlace, arrivalPlace, departureDate, arrivalDate,
  departureCity, arrivalCity, setConnection, auth, trip,
}) => {
  const [toggleButton, setToggleButton] = useState(false);
  const [isClicked, setisClicked] = useState(false);

  const addFlightToTrip = (e) => {
    e.preventDefault();
    setToggleButton(!toggleButton);
    setisClicked(true);
    setConnection({
      connection: `${departureCity} - ${arrivalCity}`,
      out: departureDate,
      in: arrivalDate,
      price,
      carrierIn,
      carrierOut,
    });
  };

  function formatDate(date) {
    const newDate = date.slice(0, 10);
    const day = newDate.slice(8, 10);
    const month = newDate.slice(5, 7);
    const year = newDate.slice(0, 4);
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="flights">
      <div className="flights-container">
        <div className="carrier carrier-departure">
          <h3 className="carrier-name">{carrierIn}</h3>
          <div className="flight-info">
            <h2>{departurePlace}</h2>
            <div className="route-info">
              <h3>{formatDate(departureDate)}</h3>
              <hr />
              <h3 className="isDirect">{isDirect ? 'Direct' : 'Indirect'}</h3>
            </div>
            <h2>{arrivalPlace}</h2>
          </div>
        </div>
        <hr />
        <div className="carrier carrier-return">
          <h3 className="carrier-name">{carrierOut}</h3>
          <div className="flight-info">
            <h2>{arrivalPlace}</h2>
            <div className="route-info">
              <h3>{formatDate(arrivalDate)}</h3>
              <hr />
              <h3 className="isDirect">{isDirect ? 'Direct' : 'Indirect'}</h3>
            </div>
            <h2>{departurePlace}</h2>
          </div>
        </div>
      </div>
      <div className="price">
        <h1>
          <span>€</span>
          {price}
        </h1>
        <Tooltip
          title={auth ? `Add to trip:${trip.currentTrip.toUpperCase()}` : 'Please log in or sign up to save flights'}
          placement="right"
        >
          <span>
            <button
              style={isClicked || !auth ? { pointerEvents: 'none' } : {}}
              type="button"
              className="button"
              disabled={isClicked || !auth}
              onClick={(e) => addFlightToTrip(e)}
            >
              {toggleButton ? <FilledIcon style={{ color: '#C71062' }} /> : <FavoriteIcon style={{ color: '#C71062' }} />}
            </button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.isAuth,
  trip: state.tripsData,
});

Flight.propTypes = {
  carrierIn: PropTypes.string.isRequired,
  isDirect: PropTypes.bool.isRequired,
  carrierOut: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  departurePlace: PropTypes.string.isRequired,
  arrivalPlace: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
  arrivalDate: PropTypes.string.isRequired,
  departureCity: PropTypes.string.isRequired,
  arrivalCity: PropTypes.string.isRequired,
  setConnection: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  trip: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
};

export default connect(mapStateToProps, { setConnection: addConnection })(Flight);
