import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import rateLimit from '../../../modules/rate-limit';

Meteor.users.allow({
  update: function(userId, user) {
    return true;
  }
});

Meteor.methods({
  'users.sendVerificationEmail': function(userId) {
    check(userId, String);

    Accounts.sendVerificationEmail(userId);
  },
  'users.editPublicSettings': function(userId, profile) {
    check(userId, String);
    check(profile, {
      username: String,
      email: String,
      profile: {
        profilePicture: String,
        twitter: String,
        bio: String
      }
    });
    Meteor.users.update(userId, {
      $set: {
        username: profile.username,
        'emails.0.address': profile.email,
        'profile.profilePicture': profile.profile.profilePicture,
        'profile.twitter': profile.profile.twitter,
        'profile.bio': profile.profile.bio
      }
    }, (err) => {
      if (err) {
        console.log(err.reason);
      }
    });
  },
  'users.changePassword': function(userId, profile) {
    check(userId, String);
    check(profile, {
      currentPassword: String,
      newPassword: String
    });
    if (profile.newPassword) {
      Accounts.changePassword(profile.currentPassword, profile.newPassword);
    }
  }
});

rateLimit({
  methods: [
    'users.sendVerificationEmail',
    'users.editPublicSettings',
    'users.changePassword'
  ],
  limit: 5,
  timeRange: 1000
});
