import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import SettingsProfile from '../../components/SettingsProfile/SettingsProfile';
import SettingsPassword from '../../components/SettingsPassword/SettingsPassword';

export class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPublicSettings: true
    };
  }
  changeDisplayedSettings() {
    this.setState((prevState, props) => {
      return {showPublicSettings: !prevState.showPublicSettings};
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.changeDisplayedSettings.bind(this)}>Profile</button>
        <button onClick={this.changeDisplayedSettings.bind(this)}>Password</button>
        { this.state.showPublicSettings === true ?
          <SettingsProfile loading={this.props.loading} user={this.props.user} history={this.props.history} /> :
          <SettingsPassword loading={this.props.loading} user={this.props.user} history={this.props.history} />}
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
