import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="row">
        <div className="container">
          <div className="not-found-container card-panel col s12 center-align">
            <h1>404</h1>
            <h5>We couldn't find the page you were looking for.</h5>
            <p>Sorry, the page you're looking for either wasn't found, was abandoned or does not exist.
              <br />
              Please click the link below to return to the home page.
            </p>
            <Link to="/">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }
}
