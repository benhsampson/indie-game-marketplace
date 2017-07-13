import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import $ from 'jquery';
import 'jquery-validation';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let component = this;

    $(this.refs.form).validate({
      rules: {
        newPassword: {
          required: true,
          minlength: 6,
        },
        repeatNewPassword: {
          required: true,
          minlength: 6,
          equalTo: '#newPassword'
        }
      },
      messages: {
        newPassword: {
          required: 'Please enter a new password.',
          minlength: 'Please use at least 6 characters.'
        },
        repeatNewPassword: {
          required: 'Please repeat your new password.',
          equalTo: 'The passwords don\'t match, please try again.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }
  handleSubmit() {
    Accounts.resetPassword(this.props.match.params.token, this.refs.newPassword.value, (err) => {
      if (err) {
        Materialize.toast(err.reason, 4000);
      } else {
        Materialize.toast('Success! Password has been reset!', 4000, 'green');
        this.props.history.push('/');
      }
    });
  }
  render() {
    return (
      <div className="row">
        <div className="form-panel card-panel col s12 m6 l4 offset-m3 offset-l4 z-depth-2">
          <h4 className="center-align grey-text text-darken-4">Reset your password</h4>
          <p className="center-align grey-text text-darken-1">Please enter a new password below.</p>
          <form ref="form" onSubmit={e => e.preventDefault()}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input type="password" id="newPassword" ref="newPassword" className="validate" />
                <label htmlFor="newPassword">New Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input type="password" id="repeatNewPassword" ref="repeatNewPassword" className="validate" />
                <label htmlFor="repeatNewPassword">Repeat New Password</label>
              </div>
            </div>
            <button type="submit" name="action" className="btn waves-effect waves-light">Reset Password</button>
          </form>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
