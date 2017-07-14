import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PublicNavBar from '../PublicNavBar/PublicNavBar';
import AuthenticatedNavBar from '../AuthenticatedNavBar/AuthenticatedNavBar';

const NavigationBar = props => (
  <div>
    <ul id="dropdown1" className="dropdown-content">
      {/* <li><Link to={handleProfileNav(username)}>My Profile</Link></li>
      <li className="divider"></li>
      <li><Link to="/dashboard">My Dashboard</Link></li>
      <li><Link to="user/settings">Settings</Link></li>
      <li className="divider"></li>
      <li><a onClick={() => Meteor.logout()}>logout</a></li> */}
      <li>test</li>
    </ul>
    {!props.authenticated ? <PublicNavBar /> : <AuthenticatedNavBar {...props} />}
  </div>
);

NavigationBar.defaultProps = {
  username: ''
};

NavigationBar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

export default NavigationBar;
