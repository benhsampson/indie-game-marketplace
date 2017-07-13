import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import $ from 'jquery';
import 'jquery-validation';

export default class SettingsPassword extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const component = this;

    $(this.refs.form).validate({
      rules: {
        currentPassword: {
          required: true
        },
        newPassword: {
          required: true
        }
      },
      messages: {
        currentPassword: {
          required: 'We need your current password if changing.'
        },
        newPassword: {
          equalTo: 'We need your new password if changing.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }
  handleSubmit() {
    const profile = {
      currentPassword: this.refs.currentPassword.value,
      newPassword: this.refs.newPassword.value
    };

    Meteor.call('users.changePassword', this.props.user._id, profile, (err) => {
      if (err) {
        console.log(err.reason);
      } else {
        console.log('Success!', 'Profile updated!');
      }
    });
  }
  render() {
    return (
      <div>
        <form ref="form" onSubmit={e => e.preventDefault()}>
          <label htmlFor="currentPassword">Current Password</label>
          <input type="password" name="currentPassword" id="currentPassword" ref="currentPassword" />
          <br />
          <label htmlFor="newPassword">New Password</label>
          <input type="password" name="newPassword" id="newPassword" ref="newPassword" />
          <br />
          <button type="submit">Save Profile</button>
        </form>
      </div>
    );
  }
}

SettingsPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};
