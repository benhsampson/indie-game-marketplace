import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import $ from 'jquery';
import 'jquery-validation';

export default class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const component = this;

    $(this.refs.form).validate({
      rules: {
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        email: {
          required: 'Please enter an email address here.',
          email: 'Please enter a valid email address.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }
  handleSubmit() {
    const email = this.refs.email.value;

    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        Materialize.toast(err.reason, 4000);
      } else {
        Materialize.toast('Success! Check your inbox for a reset link!', 4000, 'green');
        this.props.history.push('/login');
      }
    })
  }
  render() {
    return (
      <div className="row">
        <div className="form-panel card-panel col s12 m6 l4 offset-m3 offset-l4 z-depth-2">
          <h4 className="center-align grey-text text-darken-4">Recover your password</h4>
          <p className="center-align grey-text text-darken-1">Please enter your email address below and we'll send a recovery link.</p>
          <form ref="form" onSubmit={e => e.preventDefault()}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input type="email" id="email" ref="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <button type="submit" name="action" className="btn waves-effect waves-light">Recover Password</button>
          </form>
        </div>
      </div>
    );
  }
}

RecoverPassword.propTypes = {
  history: PropTypes.object.isRequired
};
