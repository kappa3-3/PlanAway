import React from 'react';
import { Link } from 'react-router-dom';
import AirplanemodeInactiveIcon from '@material-ui/icons/AirplanemodeInactive';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import PropTypes from 'prop-types';

const StaticInfo = ({ msg }) => (
  <div className="auth-wrapper">
    <h1 style={{ fontSize: '50px' }}>
      <AirplanemodeInactiveIcon
        color="secondary"
        fontSize="inherit"
      />
    </h1>
    <h3>{msg}</h3>
    <Link to="/">
      Make a new search
      <FlightTakeoffIcon color="primary" />
    </Link>
  </div>
);

StaticInfo.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default StaticInfo;
