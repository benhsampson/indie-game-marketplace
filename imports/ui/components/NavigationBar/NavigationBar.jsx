import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PublicNavBar from '../PublicNavBar/PublicNavBar';
import AuthenticatedNavBar from '../AuthenticatedNavBar/AuthenticatedNavBar';

const NavigationBar = props => (
  <header>
    {!props.authenticated ? <PublicNavBar /> : <AuthenticatedNavBar {...props} />}
  </header>
);

NavigationBar.defaultProps = {
  username: ''
};

NavigationBar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

export default NavigationBar;
