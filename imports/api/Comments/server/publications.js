import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Comments from '../Comments';

Meteor.publish('comments', function comments(gameId) {
  check(gameId, String);

  // return Comments.find({ gameId });
  return Comments.find();
});
