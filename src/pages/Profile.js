import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import FlightTakeOffIcon from '@material-ui/icons/FlightTakeoff';
import { setUserData } from '../actions/userData';
import ProfileInfo from '../components/ProfileInfo';
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

function Profile({ userData, trip, updateUser }) {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [redirect, setRedirect] = useState(false);

  return (
    <div>
      {userData !== null
        ? (
          <form className={classes.root} noValidate autoComplete="off">
            {edit
              ? (
                <div className="Profile-wrapper">
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="first name"
                      defaultValue={userData.first_name}
                      variant="outlined"
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="last name"
                      defaultValue={userData.last_name}
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="email adress"
                      defaultValue={userData.email_address}
                      variant="outlined"
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      defaultValue={userData.vacation_days}
                      variant="outlined"
                    />
                  </div>
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
                </div>
              )
              : (
                <div className="Profile-wrapper">
                  <ProfileInfo />
                  <ExistingTrips userData={userData} />
                  <div className="Profile-btn">
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      endIcon={<EditIcon />}
                      type="button"
                      onClick={() => setEdit(true)}
                    >
                      <span>Edit Profile</span>
                    </Button>
                  </div>
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
                  <span className={isSaved ? 'saved-in-db' : ''} />
                </div>
              )}
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

  updateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { updateUser: setUserData })(Profile);
