// getInvited.js

const eventModels = require('../../models/eventModels');

module.exports = (req, res) => {
  if (!req.body.facebookId) {
    return res.status(400).send('Error getting invited events. Facebook Id is required');
  }
  return eventModels.getInvited(req.body.facebookId)
    .then(user => res.status(200).send(user.invitedTo))
    .catch(error => res.status(400).send('Error getting invited events:', error.message));
};
