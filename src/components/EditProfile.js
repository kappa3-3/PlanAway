import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

const EditProfile = ({ userData }) => (
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

const mapStateToProps = (state) => ({
  userData: state.userData,
});

EditProfile.propTypes = {
  userData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
};

export default connect(mapStateToProps)(EditProfile);
