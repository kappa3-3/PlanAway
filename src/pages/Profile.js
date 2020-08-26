import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import FlightTakeOffIcon from '@material-ui/icons/FlightTakeoff';
import EditIcon from '@material-ui/icons/Edit';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import ProfileInfo from '../components/ProfileInfo';
import EditProfile from '../components/EditProfile';
import { chooseTrip } from '../actions/trips';
import './Profile.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Profile({ userData, setCurrentTrip, trip }) {
  const classes = useStyles();
  const [newTrip, setNewTrip] = useState('');
  const [edit, setEdit] = useState(false);
  const [isName, setisName] = useState(false);
  const [Input, setInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSavingToDatabase = (res) => {
    const { matchedCount, modifiedCount } = res;
    setIsSaved(matchedCount === 1 && modifiedCount === 1);
  };

  const handleNewTrip = (e) => {
    e.preventDefault();
    setisName(false);
    setCurrentTrip(newTrip);
    fetch('/.netlify/functions/trips', {
      method: 'POST',
      body: JSON.stringify({
        id: userData._id,
        name: newTrip,
        flights: [],
      }),
    })
      .then((res) => res.json())
      .then((res) => handleSavingToDatabase(res));
  };

  const handleChange = (event) => {
    setCurrentTrip(event.target.value);
  };

  const handleTripName = (e) => {
    setInput(e.target.value);
    setNewTrip(e.target.value);
  };

  const handleGoBack = () => {
    setisName(false);
  };

  return (
    <div>
      {userData !== null
        ? (
          <form className={classes.root} noValidate autoComplete="off">
            {
              <div className="Profile-wrapper">
                <EditIcon style={{ color: '#E91E62' }} onClick={() => setEdit(true)} />
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
                <FormControl component="fieldset" className="trip-form">
                  <FormLabel component="legend">Select current trip:</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" onChange={handleChange}>
                    {userData.plans.map((plan) => (
                      <FormControlLabel
                        key={plan.name}
                        value={plan.name}
                        control={<Radio />}
                        label={plan.name}
                      />
                    ))}
                  </RadioGroup>
                  {!isName
                    ? (
                      <FormControlLabel
                        onClick={() => setisName(true)}
                        control={<Radio />}
                        label="Add new trip"
                      />
                    ) : (
                      <>
                        <div className="new-trip">
                          <TextField
                            required
                            id="new-trip-name"
                            label="trip name"
                            onChange={(e) => handleTripName(e)}
                            variant="outlined"
                          />
                          <div className="buttons">
                            <button
                              type="button"
                              className="saveTripButton"
                              disabled={Input.length === 0}
                              onClick={(e) => handleNewTrip(e)}
                            >
                              ADD TRIP
                                <AddIcon style={{ color: 'white' }} />
                            </button>
                            <button
                              type="button"
                              className="goBackButton"
                              onClick={() => handleGoBack()}
                            >
                              GO BACK
                                <KeyboardBackspaceRoundedIcon style={{ color: 'white' }} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                </FormControl>
                <div className="Profile-btn">
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
            }
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
  setCurrentTrip: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setCurrentTrip: chooseTrip })(Profile);
