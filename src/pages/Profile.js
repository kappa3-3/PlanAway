import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';
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

function Profile({ userData, setCurrentTrip }) {
  const [edit, setEdit] = useState(false);
  const [newTrip, setNewTrip] = useState('');
  const [isName, setisName] = useState(false);
  const classes = useStyles();

  useEffect(() => {

  }, [userData]);

  const handleNewTrip = (e) => {
    e.preventDefault();
    setisName(false);
    chooseTrip(newTrip);
    fetch('/.netlify/functions/trips', {
      method: 'POST',
      body: JSON.stringify({
        id: userData._id,
        name: newTrip,
        flights: [],
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const handleChange = (event) => {
    setCurrentTrip(event.target.value);
  };

  const handleTripName = (e) => {
    setNewTrip(e.target.value);
  };

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
                      type="submit"
                      onClick={() => setEdit(false)}
                    >
                      <span>Save changes</span>
                    </Button>
                  </div>
                </div>
              )
              : (
                <div className="Profile-wrapper">
                  <div>
                    <TextField
                      id="standard-read-only-input"
                      label="first name"
                      defaultValue={userData.first_name}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="last name"
                      defaultValue={userData.last_name}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="user-details">
                    <TextField
                      id="standard-read-only-input"
                      label="email address"
                      defaultValue={userData.email_address}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="standard-number"
                      label="vacation days"
                      type="number"
                      defaultValue={userData.vacation_days}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
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
                            <button
                              type="button"
                              className="saveTripButton"
                              onClick={(e) => handleNewTrip(e)}
                            >
                              ADD TRIP
                              <AddIcon style={{ color: 'white' }} />
                            </button>
                          </div>
                        </>
                      )}
                  </FormControl>
                  <div className="Profile-btn">
                    {!isName
                      ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          endIcon={<EditIcon />}
                          type="submit"
                          onClick={() => setEdit(true)}
                        >
                          <span>Edit Profile</span>
                        </Button>
                      ) : ''}
                  </div>
                </div>

              )}
          </form>
        ) : <Redirect to="/" />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

Profile.propTypes = {
  userData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
  setCurrentTrip: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setCurrentTrip: chooseTrip })(Profile);
