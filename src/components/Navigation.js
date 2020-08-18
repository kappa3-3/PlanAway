import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav>
      <ul className="navigation-list">
        <li>
          <Link
            to="/"
            className="navigation-link"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/myplanaway"
            className="navigation-link"
          >
            MyPlanAway
          </Link>
        </li>
        <li>
          <Link
            to="/account/login"
            className="navigation-link navigation-auth"
          >
            LogIn
          </Link>
        </li>
        <li>
          <Link
            to="/account/signup"
            className="navigation-link navigation-auth"
          >
            SignUp
          </Link>
        </li>
      </ul>
    </nav>
  );
}
