import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TripInformation from '../components/TripInformation';
import './MyPlanAway.css';

function MyPlanAwayCurrent({ auth }) {
  return (
    <div className="flex-width">
      { auth ? <TripInformation /> : ''}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.isAuth,
});

MyPlanAwayCurrent.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MyPlanAwayCurrent);
