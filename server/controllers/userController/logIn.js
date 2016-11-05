const userModels = require('../../models/userModels');

module.exports = (req, res) => {
  userModels.logIn(req.body)
    .then((user) => {
      res
        .status(200)
        .json(user);
    })
    .catch((error) => {
      console.log('oh no, error in login method!!');
      console.log(error);
      console.log(error.message);
      res.status(400).json({ message: error.message });
    });
};
