// getFriends.js
const friendModels = require('../../models/friendModels');

module.exports = (req, res) => {
  return friendModels.getFriendInfo(req.body)
    .then(friends => { console.log(friends); res.status(200).json(friends)})
    .catch(error => { console.log(error); res.status(400).send('Error getting friend info:', error.message)});
};

