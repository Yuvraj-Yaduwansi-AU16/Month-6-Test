const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add comment'],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
