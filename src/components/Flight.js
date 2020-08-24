import React from 'react';
import './Flight.css';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';

const Flight = () => {
  return (
    <div className="flights">
      <div className="flights-container">
        <div className="carrier carrier-departure">
          <h3 className="carrier-name">Carrier Name</h3>
          <h2>AMS</h2>
          <div className="route-info">
            <h3>DD-MM-YYYY</h3>
            <hr />
            <h3 className="isDirect">Direct</h3>
          </div>
          <h2>LHR</h2>
        </div>
        <hr />
        <div className="carrier carrier-return">
          <h3 className="carrier-name">Carrier Name</h3>
          <h2>LHR</h2>
          <div className="route-info">
            <h3>DD-MM-YYYY</h3>
            <hr />
            <h3 className="isDirect">Direct</h3>
          </div>
          <h2>AMS</h2>
        </div>
      </div>
      <div className="price">
        <h1>Price</h1>
        <button type="button" className="button">
          <FavoriteIcon style={{ color: '#C71062' }} />
        </button>
      </div>
    </div>
  );
};

export default Flight;
