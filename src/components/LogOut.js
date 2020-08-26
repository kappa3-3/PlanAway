import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as authActions from '../actions/auth';
import * as userData from '../actions/userData';
import { clearConnection } from '../actions/trips';
import { clearFlights } from '../actions/flights';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.75),
    },
  },
}));

function LogOut({
  removeUserData, denied, clearTrips, removeFlights,
}) {
  const handleLogOut = (e) => {
    e.preventDefault();
    removeFlights();
    removeUserData();
    clearTrips();
    denied();
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="default"
        component="span"
        className="navigation-link navigation-auth"
        onClick={(e) => handleLogOut(e)}
      >
        <ExitToAppIcon />
      </Button>
    </div>
  );
}

LogOut.propTypes = {
  removeUserData: PropTypes.func.isRequired,
  denied: PropTypes.func.isRequired,
  clearTrips: PropTypes.func.isRequired,
  removeFlights: PropTypes.func.isRequired,
};

export default connect(null, {
  removeFlights: clearFlights,
  clearTrips: clearConnection,
  ...authActions,
  ...userData,
})(LogOut);
