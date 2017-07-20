import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Comments from '../Comments';
import rateLimit from '../../../modules/rate-limit';
import shortid from 'shortid';

Meteor.methods({
  'comments.insert': function commentsInsert(comment) {
    check(comment, {
      gameId: String,
      comment: String
    });

    return Comments.insert({ _id: shortid.generate(), owner: Meteor.user().username, ...comment })
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
