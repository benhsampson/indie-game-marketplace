import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="preloader-container center-align">
          <div className="preloader-wrapper active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
