import React from 'react';
import { Link } from 'react-router-dom';

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
            className="navigation-link"
          >
            LogIn
          </Link>
        </li>
        <li>
          <Link
            to="/account/signup"
            className="navigation-link"
          >
            SignUp
          </Link>
        </li>
      </ul>
    </nav>
  );
}
