import React from 'react';
import PropTypes from 'prop-types';
import './Flight.css';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';

const Flight = ({
  carrierIn, isDirect, carrierOut, price, currency,
  departurePlace, arrivalPlace, departureDate, arrivalDate,
}) => (
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
      <button type="button" className="button">
        <FavoriteIcon style={{ color: '#C71062' }} />
      </button>
    </div>
  </div>
);

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
};

export default Flight;
