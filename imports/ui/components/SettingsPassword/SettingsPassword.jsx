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
        <h5>Password</h5>
        <form ref="form" onSubmit={e => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="password"
                id="currentPassword"
                ref="currentPassword"
              />
              <label htmlFor="currentPassword">Current Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="password"
                id="newPassword"
                ref="newPassword"
              />
              <label htmlFor="newPassword">New Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="password"
                id="repeatNewPassword"
                ref="repeatNewPassword"
              />
              <label htmlFor="repeatNewPassword">Repeat New Password</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button type="submit" name="action" className="btn waves-effect waves-light right">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SettingsPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};
