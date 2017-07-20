import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Comments from '../../../api/Comments/Comments';
import Comment from '../Comment/Comment';

const CommentsList = ({ comments }) => (
  <div className="comments-list row">
    {comments.map((comment) => (
      <Comment key={comment._id} comment={comment} />
    ))}
  </div>
);

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentsList
