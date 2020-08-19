import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileIcon from './ProfileIcon';
import './Navigation.css';

function Navigation({ auth }) {
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
            MyPlanAway
          </Link>
        </li>
        {auth
          ? (
            <li>
              <button
                type="button"
                className="navigation-link navigation-auth"
              >
                Log Out
              </button>
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
};

const mapStateToProps = (state) => ({
  auth: state.isAuth,
});

export default connect(mapStateToProps)(Navigation);
