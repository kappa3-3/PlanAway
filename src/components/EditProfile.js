import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const EditProfile = ({ userData }) => {
  const classes = useStyles();
  return (
    <>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(EditProfile);