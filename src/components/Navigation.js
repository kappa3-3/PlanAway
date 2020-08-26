import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileIcon from './ProfileIcon';
import LogOut from './LogOut';
import './Navigation.css';

function Navigation({ auth, currentTrip }) {
  return (
    <nav>
      <ul className="navigation-list">
        <li>
          <Link
            to="/"
            className="navigation-link navigation-page"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={auth ? '/myplanaway' : '/account/login'}
            className="navigation-link navigation-page"
          >
            MyPlanAway
          </Link>
        </li>
        {currentTrip
          ? (
            <li className="navigation-static">
              CurrentTrip:
              <span className="accent-color">
                {` ${currentTrip}`}
              </span>
            </li>
          ) : ''}
        {auth
          ? (
            <li className="navigation-auth">
              <LogOut />
            </li>
          ) : (
            <li>
              <Link
                to="/account/signup"
                className="navigation-link navigation-auth"
              >
                SignUp
              </Link>
            </li>
          )}
        {auth
          ? (
            <li className="navigation-auth">
              <ProfileIcon />
            </li>
          ) : (
            <li>
              <Link
                to="/account/login"
                className="navigation-link navigation-auth"
              >
                LogIn
              </Link>
            </li>
          )}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  auth: PropTypes.bool.isRequired,
  currentTrip: PropTypes.string,
};

Navigation.defaultProps = {
  currentTrip: '',
};

const mapStateToProps = (state) => ({
  auth: state.isAuth,
  currentTrip: state.tripsData.currentTrip,
});

export default connect(mapStateToProps)(Navigation);
