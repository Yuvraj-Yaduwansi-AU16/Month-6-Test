const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Posts = require('../models/Posts');

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Posts.find();

  if (!posts) {
    return next(
      new ErrorResponse(`posts not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: posts });
});

exports.getpost = asyncHandler(async (req, res, next) => {
  const post = await Posts.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: post });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Posts.create(req.body);

  res.status(201).json({
    success: true,
    data: post,
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Posts.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  post = await Posts.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: post });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Posts.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  post.remove();

  res.status(200).json({ success: true, data: {} });
});
