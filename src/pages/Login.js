import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlightTakeOffIcon from '@material-ui/icons/FlightTakeoff';
import { Link } from 'react-router-dom';

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

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isUser, setIsUser] = useState(true);
  const classes = useStyles();

  const handleResponse = (res) => {
    if (res === null) setIsUser(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/.netlify/functions/users', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json())
      .then((res) => handleResponse(res));
  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          id="outlined-required"
          label="Email address"
          variant="outlined"
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          endIcon={<FlightTakeOffIcon />}
          type="submit"
          onClick={(event) => handleSubmit(event)}
        >
          Log In
        </Button>
        <span className={!isUser ? 'access-denied' : ''} />
      </form>
      <div>
        <span>Don&apos;t have an account yet?</span>
        <span>
          <Link to="/account/signup">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
}
