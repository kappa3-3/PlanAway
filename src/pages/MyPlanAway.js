import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function MyPlanAway({ auth }) {
  return (
    <div>
      {auth
        ? <h1>Hello it is the MyPlanAway page</h1>
        : <Redirect to="/account/login" />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.isAuth,
});

MyPlanAway.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MyPlanAway);
