import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import FilledIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { addConnection } from '../actions/trips';
import './Flight.css';

const Flight = ({
  carrierIn, isDirect, carrierOut, price, currency,
  departurePlace, arrivalPlace, departureDate, arrivalDate,
  departureCity, arrivalCity, setConnection,
}) => {
  const [toggleButton, setToggleButton] = useState(false);

  const addFlightToTrip = (e) => {
    e.preventDefault();
    setToggleButton(!toggleButton);
    setConnection({
      connection: `${departureCity} - ${arrivalCity}`,
      out: departureDate,
      in: arrivalDate,
      price,
      carrierIn,
      carrierOut,
    });
  };

  return (
    <div className="flights">
      <div className="flights-container">
        <div className="carrier carrier-departure">
          <h3 className="carrier-name">{carrierIn}</h3>
          <div className="flight-info">
            <h2>{departurePlace}</h2>
            <div className="route-info">
              <h3>{departureDate}</h3>
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
              <h3>{arrivalDate}</h3>
              <hr />
              <h3 className="isDirect">{isDirect ? 'Direct' : 'Indirect'}</h3>
            </div>
            <h2>{departurePlace}</h2>
          </div>
        </div>
      </div>
      <div className="price">
        <h1>
          <span>{currency}</span>
          {price}
        </h1>
        <Tooltip title="Add to trip: Hawai" placement="right">
          <button
            type="button"
            className="button"
            onClick={(e) => addFlightToTrip(e)}
          >
            {toggleButton ? <FilledIcon style={{ color: '#C71062' }} /> : <FavoriteIcon style={{ color: '#C71062' }} />}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

Flight.propTypes = {
  carrierIn: PropTypes.string.isRequired,
  isDirect: PropTypes.bool.isRequired,
  carrierOut: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  departurePlace: PropTypes.string.isRequired,
  arrivalPlace: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
  arrivalDate: PropTypes.string.isRequired,
  departureCity: PropTypes.string.isRequired,
  arrivalCity: PropTypes.string.isRequired,
  setConnection: PropTypes.func.isRequired,
};

export default connect(null, { setConnection: addConnection })(Flight);
