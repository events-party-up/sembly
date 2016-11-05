const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  facebookId: {
    type: String,
    unique: true,
    required: true,
  },
  friends: [{ type: Schema.ObjectId, ref: 'User' }],
  requests: [{ type: Schema.ObjectId, ref: 'User' }],
  saved: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  hosting: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  invitedTo: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  photoUrl: String,
});

module.exports = mongoose.model('User', UserSchema);
