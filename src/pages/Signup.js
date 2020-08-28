import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlightTakeOffIcon from '@material-ui/icons/FlightTakeoff';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { approved } from '../actions/auth';
import { setUserData } from '../actions/userData';
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

function SignUp({ auth, writeUserData, setApproved }) {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isInDb, setIsInDb] = useState(false);

  const handleSignUpResponse = (res) => {
    if (res === null) {
      setIsInDb(true);
    } else {
      writeUserData(res);
      setApproved();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/.netlify/functions/signup', {
      method: 'POST',
      body: JSON.stringify({
        email, password, name, surname,
      }),
    }).then((res) => res.json())
      .then((res) => handleSignUpResponse(res));
  };

  const classes = useStyles();
  return (
    <div className="auth-wrapper">
      {auth
        ? <Redirect to="/" />
        : (
          <>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  label="First Name"
                  variant="outlined"
                  onChange={(event) => setName(event.target.value)}
                />
                <TextField
                  required
                  label="Last Name"
                  variant="outlined"
                  onChange={(event) => setSurname(event.target.value)}
                />
              </div>
              <div>
                <TextField
                  required
                  label="Email address"
                  variant="outlined"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  required
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <p>
                <span>Already have an account?</span>
                <Link to="/account/login">
                  Log In
                </Link>
              </p>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={(e) => handleSubmit(e)}
                endIcon={<FlightTakeOffIcon />}
              >
                Sign Up
              </Button>
            </form>
            {isInDb ? <span className="user-exists" /> : ''}
          </>
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.isAuth,
});

SignUp.propTypes = {
  auth: PropTypes.bool.isRequired,
  setApproved: PropTypes.func.isRequired,
  writeUserData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setApproved: approved,
  writeUserData: setUserData,
})(SignUp);
