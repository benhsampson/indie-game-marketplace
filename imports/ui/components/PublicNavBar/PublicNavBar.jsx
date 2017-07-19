import React from 'react';
import { Link } from 'react-router-dom';

const PublicNavBar = () => (
  <div className="navbar-fixed">
    <nav className="teal darken-2">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">PLACEHOLDER</Link>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><Link to="/games">Browse Games</Link></li>
          <li><Link to="/game/new" className="waves-effect waves-light btn">Upload <i className="material-icons right">file_upload</i></Link></li>
        </ul>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="signup">Signup</Link></li>
        </ul>
      </div>
    </nav>
  </div>
);

export default PublicNavBar;
