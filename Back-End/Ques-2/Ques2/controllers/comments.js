const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');

exports.getComments = asyncHandler(async (req, res, next) => {
  const posts = await Comment.find();

  if (!posts) {
    return next(
      new ErrorResponse(`posts not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: posts });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  const post = await Comment.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: post });
});

exports.createComment = asyncHandler(async (req, res, next) => {
  const post = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: post,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  let post = await Comment.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  post = await Comment.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: post });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const post = await Comment.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  post.remove();

  res.status(200).json({ success: true, data: {} });
});
