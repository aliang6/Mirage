const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  name: {type: String, require: true},
  messages: { type: Array, required: true }
});

const Messages = mongoose.model('Messages', MessagesSchema);
module.exports = Messages;