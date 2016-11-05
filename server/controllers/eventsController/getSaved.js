const eventModels = require('../../models/eventModels');

module.exports = (req, res) => {
  if (!req.body.facebookId) {
    return res.status(400).send('Error getting saved events. Facebook Id is required.');
  }
  return eventModels.getSaved(req.body.facebookId)
    .then(user => res.status(200).send(user.saved))
    .catch(error => res.status(400).send('An error occured saving the model:', error.message));
};
