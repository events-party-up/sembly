const rp = require('request-promise');
const addUser = require('./addUser');
const checkStatus = require('../../requestHelpers');
const config = require('../../config');
const User = require('../../schemas/userSchema');

let decodedFacebookId;

module.exports = reqBody => (
  rp({
    uri: 'https://graph.facebook.com/v2.8/debug_token',
    qs: {
      input_token: reqBody.token,
      // ref: http://stackoverflow.com/a/19360136
      access_token: `${config.appId}|${config.appSecret}`,
    },
  })
  .then(checkStatus)
  .then(response => JSON.parse(response))
  .then(({ data }) => {
    decodedFacebookId = data.user_id;

    return User.findOne({
      facebookId: decodedFacebookId,
    })
    .populate('requests').exec();
  })
  .then((user) => {
    if (!user) {
      // Create the user if they don't exist
      const newUser = Object.assign({}, reqBody);
      newUser.facebookId = decodedFacebookId;
      return addUser(newUser);
    } else if (reqBody.facebookId !== user.facebookId) {
      throw new Error('Token doesn\'t match provided facebookId');
    } else {
      return user;
    }
  })
  .then(savedUser => savedUser)
  .catch((err) => {
    console.error(err);
  })
);
