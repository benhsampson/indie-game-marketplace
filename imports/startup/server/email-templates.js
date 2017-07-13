import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const name = 'Indie Game Marketplace';
const email = '<support@indiegamemarketplace.com>';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.resetPassword.subject = (user) => {
  return 'Forgotten password reset'
};

emailTemplates.resetPassword.html = (user, url) => {
  const userEmail = user.emails[0].address;
  const urlWithoutHash = url.replace('#/', '');

  if (Meteor.isDevelopment) {
    console.info(`Reset Password Link: ${urlWithoutHash}`);
  }

  return `<h2>Hi ${user.username}</h2>
    <br />
    <p>You've requested to reset your password for Indie Game Marketplace account. Click the button below to reset it.</p>
    <a href=${urlWithoutHash}>${urlWithoutHash}</a>
    <br />
    <p>If this was not you or you didn't request a reset, please ignore this email.</p>
    <p>Thanks,<br/>Indie Game Marketplace Team</p>`
}

emailTemplates.verifyEmail.subject = (user) => {
  return 'Verify your email address'
};

emailTemplates.verifyEmail.html = (user, url) => {
  const userEmail = user.emails[0].address;
  const urlWithoutHash = url.replace('#/', '');

  if (Meteor.isDevelopment) {
    console.info(`Verify Email Link: ${urlWithoutHash}`);
  }

  return `<h2>Hi ${user.username}</h2>
    <br />
    <p>Click on the link below to verify your email address.</p>
    <a href=${urlWithoutHash}>${urlWithoutHash}</a>
    <br />
    <p>If your having any issues, feel free to contact us by replying.</p>
    <br />
    <p>Thanks,<br/>Indie Game Marketplace Team</p>`
}
