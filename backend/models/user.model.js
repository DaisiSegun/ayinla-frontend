const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // minlength: 8,
      // maxlength: 20,
    },
    confirmPassword: {
      type: String,
      required: true,
      // minlength: 8,
      // maxlength: 20,
    },
    phone: {
      type: String,
      required: true,
    },
  

   
  
    profilePicture: {
      type: String,
      required: false,
    },
 
   
 
    isAdmin: {
      type: Boolean,
      default: false,
    },
 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
