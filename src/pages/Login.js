import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlightTakeOffIcon from '@material-ui/icons/FlightTakeoff';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import * as userData from '../actions/userData';
import './Auth.css';

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

function Login({
  approved, denied, auth, setUserData,
}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isUser, setIsUser] = useState(true);
  const classes = useStyles();

  const handleResponse = (res) => {
    if (res === null) {
      setIsUser(false);
      denied();
    } else {
      setUserData(res);
      approved();
    }
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
    <div className="auth-wrapper">
      <form className={classes.root} noValidate autoComplete="off">
        <div>
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

        </div>
        <p>
          <span>Don&apos;t have an account yet?</span>
          <Link to="/account/signup">
            Sign Up
          </Link>
        </p>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          endIcon={<FlightTakeOffIcon />}
          type="submit"
          onClick={(event) => handleSubmit(event)}
        >
          <span>Log In</span>
        </Button>
      </form>
      {auth
        ? <Redirect to="/profile" />
        : <span className={!isUser ? 'access-denied' : ''} />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.isAuth,
});

Login.propTypes = {
  auth: PropTypes.bool.isRequired,
  approved: PropTypes.func.isRequired,
  denied: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { ...authActions, ...userData })(Login);
