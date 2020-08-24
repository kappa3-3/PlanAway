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
            to="/myplanaway"
            className="navigation-link navigation-page"
          >
            { !currentTrip 
            ? <span>MyPlanAway</span>
            : <span>MyPlanAway : <span className="accent-color">{currentTrip}</span></span>
            }
          </Link>
        </li>
        {auth
          ? (
            <li>
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
            <li>
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
  currentTrip: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.isAuth,
  currentTrip: state.tripsData.currentTrip
});

export default connect(mapStateToProps)(Navigation);
