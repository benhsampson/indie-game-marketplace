import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Comments from '../Comments';
import shortid from 'shortid';
import moment from 'moment';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'comments.insert': function commentsInsert(comment) {
    check(comment, {
      gameId: String,
      comment: String
    });

    console.log('inserting comment');

    return Comments.insert({
      _id: shortid.generate(),
      owner: Meteor.user().username,
      createdAt: moment().valueOf(),
      ...comment})
  },
  'comments.remove': function commentsRemove(commentId) {
    check(commentId, String);

    Comments.remove(commentId);
  }
})

rateLimit({
  methods: [
    'comments.insert',
    'comments.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
