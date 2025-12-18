// models/user.js
//const mongoose = require('mongoose');

//const userSchema = new mongoose.Schema(
  //{
   // name: { type: String, required: true },
   // email: { type: String, required: true, unique: true },
    //password: { type: String, required: true },
   // role: {
   //   type: String,
    //  enum: ['farmer', 'buyer', 'admin'],
  //    default: 'farmer',
   //},
  //},
 //{ timestamps: true }
//);

//module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "seller" }
});

module.exports = mongoose.model("User", userSchema);