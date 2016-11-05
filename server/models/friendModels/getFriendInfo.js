const User = require('../../schemas/userSchema');

module.exports = friendFacebookIds =>
  User.find({})
  .where('facebookId')
  .in(friendFacebookIds)
  .select({ token: 0, _id: 0, __v: 0 })
  .exec();
