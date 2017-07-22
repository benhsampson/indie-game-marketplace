import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="page-footer grey darken-2">
    <div className="container">
      <div className="row">
        <div className="col s6 m4">
          <p className="white-text">What We Do</p>
          <ul>
            <li><Link to="/docs" className="grey-text text-lighten-1">About</Link></li>
            <li><Link to="/docs" className="grey-text text-lighten-1">FAQ</Link></li>
          </ul>
        </div>
        <div className="col s6 m4">
          <p className="white-text">We Are Social Beings</p>
          <ul>
            <li><a href="https://twitter.com/indigames_site" target="_blank" className="grey-text text-lighten-1">Twitter</a></li>
            <li><a href="http://fb.me/indigames.site" target="_blank" className="grey-text text-lighten-1">Facebook</a></li>
          </ul>
        </div>
        <div className="col s12 m4">
          <p className="white-text">Touch Base With Us</p>
          <ul>
            <li><a href="#" className="grey-text text-lighten-1">Contact Us</a></li>
            <li><a href="#" className="grey-text text-lighten-1">Give Feedback</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
        <a className="white-text">© 2017 indi.games</a>
        <Link to="/privacy" className="white-text right">Privacy and Terms</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
