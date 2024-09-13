// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a Post embedded within a User document
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the schema for a User
const userSchema = new Schema({
 userId:{
    type:String,
    required:true,
 },
  posts: [postSchema], // Array of posts
});

// Create and export the User model based on the schema
const User = mongoose.model('Posts', userSchema);
module.exports = User;
