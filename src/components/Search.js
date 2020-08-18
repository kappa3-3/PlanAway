import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './Search.css';

const Search = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const handleDepartureChange = (date) => {
    setDepartureDate(date);
  };

  const handleReturnChange = (date) => {
    setReturnDate(date);
  };
  return (
    <div className="search-component">
      <form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        </MuiPickersUtilsProvider>
      </form>
    </div>
  );
};

export default Search;
