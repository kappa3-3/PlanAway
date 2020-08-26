import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlightTakeOffIcon from '@material-ui/icons/FlightTakeoff';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { storeFlights } from '../actions/flights';
import './Search.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Search = ({ setFlights }) => {
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [places, setPlaces] = useState([]);
  const [fromPlaceId, setFromPlaceId] = useState();
  const [toPlaceId, setToPlaceId] = useState();
  const [redirect, setRedirect] = useState(false);

  const classes = useStyles();

  const formatDate = (date) => {
    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${(date.getMonth() + 1)}`).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleDepartureChange = (date) => {
    setDepartureDate(formatDate(date));
  };

  const handleReturnChange = (date) => {
    setReturnDate(formatDate(date));
  };

  const fetchPlaces = (e) => {
    e.preventDefault();
    fetch('/.netlify/functions/places', {
      method: 'POST',
      body: e.target.value,
    }).then((res) => res.json())
      .then((res) => setPlaces(res.Places));
  };

  const defaultProps = {
    options: places,
    getOptionLabel: (place) => `${place.PlaceName} (${place.PlaceId.slice(0, 3)}), ${place.CountryName}`,
  };

  const fetchDestinations = (e) => {
    e.preventDefault();
    fetch('/.netlify/functions/destinations', {
      method: 'POST',
      body: JSON.stringify({
        departureDate, returnDate, fromPlaceId, toPlaceId,
      }),
    }).then((res) => res.json())
      .then((res) => setFlights(res))
      .then(() => setRedirect(true));
  };

  return (
    <div className="search-component">
      <form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <div className="search-input-width search-input-padding-middle">
              <Autocomplete
                options={defaultProps.options}
                getOptionLabel={defaultProps.getOptionLabel}
                id="controlled-demo"
                onChange={(event, newValue) => {
                  if (newValue) {
                    setFromPlaceId(newValue.PlaceId);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="From"
                    margin="normal"
                    onChange={(event) => {
                      if (event.target.value.length === 3) {
                        fetchPlaces(event);
                      }
                    }}
                  />
                )}
              />
            </div>
            <div className="search-input-width">
              <Autocomplete
                options={defaultProps.options}
                getOptionLabel={defaultProps.getOptionLabel}
                id="controlled-demo"
                onChange={(event, newValue) => {
                  if (newValue) {
                    setToPlaceId(newValue.PlaceId);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="To"
                    margin="normal"
                    onChange={(event) => {
                      if (event.target.value.length === 3) {
                        fetchPlaces(event);
                      }
                    }}
                  />
                )}
              />
            </div>
          </Grid>
          <Grid container justify="space-around">
            <div className="search-input-width search-input-padding-middle">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="departure"
                value={departureDate}
                onChange={handleDepartureChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </div>
            <div className="search-input-width">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                margin="normal"
                id="date-picker-dialog"
                label="return"
                format="dd/MM/yyyy"
                value={returnDate}
                onChange={handleReturnChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </div>
          </Grid>
          <div className="search-btn">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              endIcon={<FlightTakeOffIcon />}
              type="submit"
              onClick={(e) => fetchDestinations(e)}
            >
              Search Flights
            </Button>
          </div>
        </MuiPickersUtilsProvider>
      </form>
      {redirect ? <Redirect to="/flights" /> : ''}
    </div>
  );
};

Search.propTypes = {
  setFlights: PropTypes.func.isRequired,
};

export default connect(null, { setFlights: storeFlights })(Search);
