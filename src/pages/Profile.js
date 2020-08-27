import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import FlightTakeOffIcon from '@material-ui/icons/FlightTakeoff';
import EditIcon from '@material-ui/icons/Edit';
import ProfileInfo from '../components/ProfileInfo';
import EditProfile from '../components/EditProfile';
import ExistingTrips from '../components/ExistingTrips';
import './Profile.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Profile({ userData, trip }) {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [redirect, setRedirect] = useState(false);

  return (
    <div>
      {userData !== null
        ? (
          <form className={classes.root} noValidate autoComplete="off">
            <div className="Profile-wrapper">
              <EditIcon style={{ color: '#E91E62' }} className="edit-icon" onClick={() => setEdit(true)} />
              {edit
                ? (
                  <>
                    <EditProfile />
                    <div className="Profile-btn">
                      <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        type="button"
                        onClick={() => setEdit(false)}
                      >
                        <span>Save changes</span>
                      </Button>
                    </div>
                  </>
                )
                : <ProfileInfo />}
              {!edit ? <ExistingTrips userData={userData} /> : ''}
              {trip.currentTrip
                ? (
                  <div className="search-btn">
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      endIcon={<FlightTakeOffIcon />}
                      type="button"
                      onClick={() => setRedirect(true)}
                    >
                      Search Flights
                    </Button>
                  </div>
                ) : ''}
            </div>
            {redirect ? <Redirect to="/flights" /> : ''}
          </form>
        ) : <Redirect to="/" />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.userData,
  trip: state.tripsData,
});

Profile.propTypes = {
  trip: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
  userData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
};

export default connect(mapStateToProps)(Profile);
