const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Cascade delete courses when a bootcamp is deleted
PostsSchema.pre('remove', async function (next) {
  console.log(`Comments being removed from Posts ${this._id}`);
  await this.model('Comments').deleteMany({ post: this._id });
  next();
});

// Reverse populate with virtuals
PostsSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  justOne: false,
});
module.exports = mongoose.model('Post', PostsSchema);
