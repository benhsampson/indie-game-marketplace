import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('users.profileInfo', function (username) {
  check(username, String);

  return Meteor.users.find({ username }, {
    fields: {
      username: 1,
      'profile.profilePicture': 1,
      'profile.twitter': 1,
      'profile.bio': 1,
      'profile.followers': 1,
      'profile.following': 1
    }
  });
});

Meteor.publish('users.privateInfo', function (_id) {
  check(_id, String);

  return Meteor.users.find(_id, {
    fields: {
      'privateInfo.earnings': 1,
      'privateInfo.purchases': 1,
      'privateInfo.downloads': 1,
      'privateInfo.views': 1
    }
  });
});
