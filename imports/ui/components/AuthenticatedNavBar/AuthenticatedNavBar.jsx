import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const handleProfileNav = username => `/profile/${username}`;

export default class AuthenticatedNavBar extends Component {
  componentDidMount() {
    $(document).ready(function() {
      $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false,
        hover: true,
        gutter: 0,
        belowOrigin: true,
        alignment: 'right',
        stopPropagation: false
      });
    });
  }
  render() {
    return (
      <div className="navbar-fixed">
        <ul id="dropdown1" className="dropdown-content">
          <li><Link to={handleProfileNav(this.props.username)}>Profile</Link></li>
          <li className="divider"></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/user/settings">Settings</Link></li>
          <li className="divider"></li>
          <li><a onClick={() => Meteor.logout()}>Logout</a></li>
        </ul>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">PLACEHOLDER</Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li><Link to="/games">Browse Games</Link></li>
              <li><Link to="/game/new" className="waves-effect waves-light btn">Upload <i className="material-icons right">file_upload</i></Link></li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a data-activates="dropdown1" className="dropdown-button">
                  {this.props.username}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

AuthenticatedNavBar.propTypes = {
  username: PropTypes.string.isRequired
};
