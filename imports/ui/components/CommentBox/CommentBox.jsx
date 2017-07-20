import React, { Component} from 'react';
import $ from 'jquery';
import 'jquery-validation';

export default class CommentsBox extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const component = this;

    $(this.refs.form).validate({
      rules: {
        commentsInput: {
          required: true,
          maxlength: 256
        }
      },
      messages: {
        commentsInput: {
          required: 'Please enter a comment.',
          maxlength: 'Your comment cannot exceed 256 characters.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }
  handleSubmit() {
    let comment = this.refs.commentInput.value;

    Meteor.call()
  }
  render() {
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="commentInput">Comment</label>
          <input
            type="text"
            id="commentInput"
            ref="commentInput"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
