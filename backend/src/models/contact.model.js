const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Phone: { type: String, required: true },
  Address: { type: String, required: true },
  notes: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isDeleted : { type: Boolean, default: false },
});
module.exports = mongoose.model("Contact", ContactSchema);
