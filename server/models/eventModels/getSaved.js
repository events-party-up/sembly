// getSaved.js
const User = require('../../schemas/userSchema');

module.exports = facebookId =>
  User.findOne({ facebookId })
    .populate('saved')
    .exec();
