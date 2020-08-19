import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Profile({ userData }) {
  const [edit, setEdit] = useState(false);
  const classes = useStyles();
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        {edit
          ? (
            <div>
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                type="submit"
                onClick={() => setEdit(false)}
              >
                <span>Save changes</span>
              </Button>
            </div>
          )
          : (
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<EditIcon />}
                type="submit"
                onClick={() => setEdit(true)}
              >
                <span>Edit</span>
              </Button>
            </div>
          )}
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

Profile.propTypes = {
  userData: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(Profile);
