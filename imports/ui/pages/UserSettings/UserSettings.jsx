import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import SettingsProfile from '../../components/SettingsProfile/SettingsProfile';
import SettingsPassword from '../../components/SettingsPassword/SettingsPassword';

export class UserSettings extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 l8 offset-l2">
            <div className="settings-form card-panel">
              <div className="row">
                <div className="col s12">
                  <ul className="tabs">
                    <li className="tab col s3">
                      <a href="#1">Profile</a>
                    </li>
                    <li className="tab col s3">
                      <a href="#2">Password</a>
                    </li>
                    {/* <li className="tab col s3">
                      <a href="#3">Payment</a>
                    </li>
                    <li className="tab col s3">
                      <a href="#4">Seller</a>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div id="1" className="settings-form-content">
                    <SettingsProfile loading={this.props.loading} user={this.props.user} history={this.props.history} />
                  </div>
                  <div id="2" className="settings-form-content">
                    <SettingsPassword loading={this.props.loading} user={this.props.user} history={this.props.history} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserSettings.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    loading: false,
    user: Meteor.user()
  };
}, UserSettings);
