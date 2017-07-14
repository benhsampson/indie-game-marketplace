import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const handleProfileNav = username => `/profile/${username}`;

const AuthenticatedNavBar = ({ username }) => (
  <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">PLACEHOLDER</Link>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><Link to="/games">Browse Games</Link></li>
          <li><Link to="/games/new" className="waves-effect waves-light btn">Upload <i className="material-icons right">file_upload</i></Link></li>
        </ul>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a data-activates="dropdown1" data-beloworigin="true" data-constrainwidth="false" href="#" className="dropdown-button">
              {username}
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
          <li><a onClick={() => Meteor.logout()}>logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
);

AuthenticatedNavBar.propTypes = {
  username: PropTypes.string.isRequired
};

export default AuthenticatedNavBar;
