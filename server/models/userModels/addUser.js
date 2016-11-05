const User = require('../../schemas/userSchema');

// Add a new user to the database
module.exports = (user) => {
  return User.create(user);
  //const newUser = new User(user);
  //return newUser.save();
};
