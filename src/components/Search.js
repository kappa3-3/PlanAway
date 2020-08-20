import React, { useState } from 'react';
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
import './Search.css';
import zIndex from '@material-ui/core/styles/zIndex';

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

const Search = () => {
  const [departureDate, setDepartureDate] = useState("2020-12-01");
  const [returnDate, setReturnDate] = useState("2020-12-09");
  const [places, setPlaces] = useState([]);
  const [fromValue, setFromValue] = useState(null);
  const [fromPlaceId, setFromPlaceId] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [toPlaceId, setToPlaceId] = useState(null);

  const classes = useStyles();

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const handleDepartureChange = (date) => {
    setDepartureDate(formatDate(date));
  };

  const handleReturnChange = (date) => {
    setReturnDate(formatDate(date));
  };

  const fetchPlace = (e, place) => {
    e.preventDefault();
    fetch('/.netlify/functions/places', {
      method: 'POST',
      body: place,
     }).then((res) => res.json())
      .then((res) => setPlaces(res));
  }

  const defaultProps = {
    options: places,
    getOptionLabel: (place) => `${place.PlaceName}, ${place.CountryName}`,
  };

  const fetchDestinations = (e) => {
    e.preventDefault();
    fetch('/.netlify/functions/destinations', {
      method: 'POST',
      body: JSON.stringify({ departureDate, returnDate, fromPlaceId, toPlaceId }),
    }).then((res) => res.json())
      .then((res) => console.log(res));
  }

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
                value={fromValue}
                onChange={(event, newValue) => {
                  event.target.value.length === 3 ? fetchPlaces(event.target.value) : '';
                  if (newValue) {
                    setFromPlaceId(newValue.PlaceId);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="From" margin="normal" />
                )}
              />
            </div>
            <div className="search-input-width">
              <Autocomplete
                options={defaultProps.options}
                getOptionLabel={defaultProps.getOptionLabel}
                id="controlled-demo"
                value={toValue}
                onChange={(event, newValue) => {
                  event.target.value.length === 3 ? fetchPlaces(event.target.value) : '';
                  if (newValue) {
                    setToPlaceId(newValue.PlaceId);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="To" margin="normal" />
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
    </div>
  );
};

export default Search;
