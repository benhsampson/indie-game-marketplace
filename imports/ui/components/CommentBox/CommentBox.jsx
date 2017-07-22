import React, { Component} from 'react';
import { Meteor } from 'meteor/meteor';
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
    let commentInput = this.refs.commentInput.value;

    const comment = {
      gameId: this.props.gameId,
      comment: commentInput
    };

    console.log('submitting comment');

    Meteor.call('comments.insert', comment, (err) => {
      if (err) {
        Materialize.toast(err.reason, 4000);
      } else {
        this.refs.commentInput.value = '';        
      }
    });
  }
  render() {
    return (
      <div>
        {Meteor.userId() ? (<div className="comment-box card-panel col s12 l8">
          <form id="form" ref="form" onSubmit={e => e.preventDefault()}>
            <div className="input-field col s12">
              <label htmlFor="commentInput">Comment</label>
              <input
                type="text"
                id="commentInput"
                ref="commentInput"
              />
            </div>
            <button
              type="submit"
              name="action"
              className="btn waves-effect waves-light">
              <i className="material-icons left">send</i> Submit
            </button>
          </form>
        </div>) : <p>Please login to post a comment</p>}
      </div>
    );
  }
}
