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
        alignment: 'left',
        stopPropagation: false
      });
      $('.button-collapse').sideNav();
      $('.collapsible').collapsible({
        accordion : true
      });
    });
  }
  render() {
    return (
      <div className="navbar-fixed">
        <ul id="nav-desktop-dropdown" className="dropdown-content">
          <li><Link to={handleProfileNav(this.props.username)}>Profile</Link></li>
          <li className="divider"></li>
          {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
          <li><Link to="/user/settings">Settings</Link></li>
          <li className="divider"></li>
          <li><a onClick={() => Meteor.logout()}>Logout</a></li>
        </ul>
        <ul id="nav-mobile" className="side-nav fixed hide-on-large-only">
          <li>
            <Link to="/games">Browse Games</Link>
          </li>
          <li>
            <Link to="/game/new">
              Upload
              <i className="material-icons right">file_upload</i>
            </Link>
          </li>
          <ul className="collapsible collapsible-accordion">
            <li>
              <a className="collapsible-header waves-effect">
                {this.props.username}
                <i className="material-icons right">arrow_drop_down</i>
              </a>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <Link to={handleProfileNav(this.props.username)}>
                      Profile
                      <i className="material-icons right">account_box</i>
                    </Link>
                  </li>
                  <li className="divider"></li>
                  {/* <li>
                    <Link to="/dashboard">
                      Dashboard
                      <i className="material-icons right">dashboard</i>
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/user/settings">
                      Settings
                      <i className="material-icons right">settings</i>
                    </Link>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a onClick={() => Meteor.logout()}>Logout</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </ul>
        <nav className="teal darken-2">
          <a href="#" data-activates="nav-mobile" className="button-collapse left show-on-medium-and-down">
            <i className="material-icons">menu</i>
          </a>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">indi.games</Link>
            <ul id="nav-desktop" className="left hide-on-med-and-down">
              <li><Link to="/games">Browse Games</Link></li>
              <li><Link to="/game/new" className="waves-effect waves-light btn">Upload <i className="material-icons right">file_upload</i></Link></li>
            </ul>
            <ul id="nav-desktop" className="right hide-on-med-and-down">
              <li>
                <a data-activates="nav-desktop-dropdown" className="dropdown-button">
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
