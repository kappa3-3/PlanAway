import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

const ProfileInfo = ({ userData }) => (
  <div>
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
    </div>
    <div className="user-details">
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
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  userData: state.userData,
});

ProfileInfo.propTypes = {
  userData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
};

export default connect(mapStateToProps)(ProfileInfo);
