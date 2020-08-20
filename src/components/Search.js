import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlightTakeOffIcon from '@material-ui/icons/FlightTakeoff';
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

const Search = () => {
  const [departureDate, setDepartureDate] = useState("2020-12-01");
  const [returnDate, setReturnDate] = useState("2020-12-09");
  const [places, setPlaces] = useState([]);
  const [from, setFrom] = useState("SFO-sky");
  const [to, setTo] = useState("ORD-sky");
  const classes = useStyles();

  const handleDepartureChange = (date) => {
    setDepartureDate(date);
  };

  const handleReturnChange = (date) => {
    setReturnDate(date);
  };

  const fetchPlaces = (input) => {
    const result = ['aaa', 'aaab' ,'aaac', 'aaad'];
    setPlaces(result);
  }

  const filterPlaces = (input) => {
    if (input.length > 3) {
      const filteredPlaces = places.filter((place) => place.includes(input));
      setPlaces(filteredPlaces);
    }
  }

  const searchDestinations = (e) => {
    e.preventDefault();
    fetch('/.netlify/functions/destinations', {
      method: 'POST',
      body: JSON.stringify({ departureDate, returnDate, from, to }),
    }).then((res) => res.json())
      .then((res) => console.log(res));
  }

  return (
    <div className="search-component">
      <form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <TextField
              required
              id="standard-required"
              label="From"
              onChange={(e) => e.target.value.length === 3 
                ? fetchPlaces(e.target.value) 
                : filterPlaces(e.target.value)}
            />
            <TextField
              required
              id="standard-required"
              label="To"
            />
          </Grid>
          <Grid container justify="space-around">
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

          </Grid>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<FlightTakeOffIcon />}
            type="submit"
            onClick={(e) => searchDestinations(e)}
          >
            Search Flights
          </Button>
        </MuiPickersUtilsProvider>
      </form>
    </div>
  );
};

export default Search;
