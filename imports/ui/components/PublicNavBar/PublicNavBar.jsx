import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PublicNavBar extends Component {
  componentDidMount() {
    $('.button-collapse').sideNav();
  }
  render() {
    return (
      <div className="navbar-fixed">
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
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <nav className="teal darken-2">
          <a href="#" data-activates="nav-mobile" className="button-collapse left show-on-medium-and-down">
            <i className="material-icons">menu</i>
          </a>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">indi.games</Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li><Link to="/games">Browse Games</Link></li>
              <li><Link to="/game/new" className="waves-effect waves-light btn">Upload <i className="material-icons right">file_upload</i></Link></li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
