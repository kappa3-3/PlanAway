import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { chooseTrip } from '../actions/trips';
import { setUserData } from '../actions/userData';

const ExistingTrips = ({ userData, setCurrentTrip, updateUser }) => {
  const [isName, setisName] = useState(false);
  const [newTrip, setNewTrip] = useState('');
  const [Input, setInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleRetrieveFromDB = () => {
    fetch('/.netlify/functions/update', {
      method: 'POST',
      body: JSON.stringify({ id: userData._id }),
    }).then((res) => res.json())
      .then((res) => {
        if (res !== null) updateUser(res);
      }).then(() => setisName(false));
  };

  const handleSavingToDatabase = (res) => {
    const { matchedCount, modifiedCount } = res;
    if (matchedCount === 1 && modifiedCount === 1) handleRetrieveFromDB();
    setIsSaved(true);
  };

  const handleTripName = (e) => {
    setInput(e.target.value);
    setNewTrip(e.target.value);
  };

  const handleNewTrip = (e) => {
    e.preventDefault();
    fetch('/.netlify/functions/trips', {
      method: 'POST',
      body: JSON.stringify({
        id: userData._id,
        name: newTrip,
        flights: [],
      }),
    }).then((res) => res.json())
      .then((res) => handleSavingToDatabase(res));
  };

  const handleChange = (event) => {
    setCurrentTrip(event.target.value);
  };

  const handleGoBack = () => {
    setisName(false);
  };

  return (
    <>
      <FormControl
        component="fieldset"
        className="trip-form"
      >
        <FormLabel component="legend">
          <h3 className="current-trips">Select current trip:</h3>
        </FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          onChange={handleChange}
        >
          {userData.plans.length > 0
            ? userData.plans.map((plan) => (
              <FormControlLabel
                key={plan.name}
                value={plan.name}
                control={<Radio />}
                label={plan.name}
              />
            ))
            : <span className="no-trips">No existing trips to display</span>}
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
                    <KeyboardBackspaceRoundedIcon
                      style={{ color: 'white' }}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
      </FormControl>
      <span className={isSaved ? 'saved-in-db' : ''} />
    </>
  );
};

ExistingTrips.propTypes = {
  userData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
  setCurrentTrip: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default connect(null, {
  setCurrentTrip: chooseTrip,
  updateUser: setUserData,
})(ExistingTrips);
