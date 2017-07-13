import { Meteor } from 'meteor/meteor';

Slingshot.fileRestrictions('ProfilePicture', {
  allowedFileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
  maxSize: 2 * 1024 * 1024
});

Slingshot.createDirective('ProfilePicture', Slingshot.S3Storage, {
  bucket: 'indie-game-marketplace',
  acl: 'public-read',
  authorize: function(file, metaContext) {
    if (!this.userId) {
      console.log('Please login before posting any files!');
    }
    return true;
  },
  key: function(file, metaContext) {
    return 'users/' + Meteor.user().username + '/profile-picture/' + file.name;
  }
});

Slingshot.fileRestrictions('GameFile', {
  allowedFileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
  maxSize: 2 * 1024 * 1024
});

Slingshot.createDirective('GameFile', Slingshot.S3Storage, {
  bucket: 'indie-game-marketplace',
  acl: 'public-read',
  authorize: function(file, metaContext) {
    if (!this.userId) {
      console.log('Please login before posting any files!');
    }
    return true;
  },
  key: function(file, metaContext) {
    return 'games/' + 'files/' + file.name;
  }
});

Slingshot.fileRestrictions('GameThumbnail', {
  allowedFileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
  maxSize: 2 * 1024 * 1024
});

Slingshot.createDirective('GameThumbnail', Slingshot.S3Storage, {
  bucket: 'indie-game-marketplace',
  acl: 'public-read',
  authorize: function(file, metaContext) {
    if (!this.userId) {
      console.log('Please login before posting any files!');
    }
    return true;
  },
  key: function(file, metaContext) {
    return 'games/' + 'thumbnails/' + file.name;
  }
});

Slingshot.fileRestrictions('GameBanner', {
  allowedFileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
  maxSize: 2 * 1024 * 1024
});

Slingshot.createDirective('GameBanner', Slingshot.S3Storage, {
  bucket: 'indie-game-marketplace',
  acl: 'public-read',
  authorize: function(file, metaContext) {
    if (!this.userId) {
      console.log('Please login before posting any files!');
    }
    return true;
  },
  key: function(file, metaContext) {
    return 'games/' + 'banners/' + file.name;
  }
});

Slingshot.fileRestrictions('GameScreenshot', {
  allowedFileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
  maxSize: 2 * 1024 * 1024
});

Slingshot.createDirective('GameScreenshot', Slingshot.S3Storage, {
  bucket: 'indie-game-marketplace',
  acl: 'public-read',
  authorize: function(file, metaContext) {
    if (!this.userId) {
      console.log('Please login before posting any files!');
    }
    return true;
  },
  key: function(file, metaContext) {
    return 'games/' + 'screenshots/' + file.name;
  }
});
