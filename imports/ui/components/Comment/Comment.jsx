import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Comment = ({ coment }) => (
  <div>
    <p>{comment.owner}</p>
    <p>{comment.comment}</p>
    <p>{comment._id}</p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;
