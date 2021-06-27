const express = require('express');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getpost,
} = require('../controllers/posts');

const router = express.Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getpost).put(updatePost).delete(deletePost);

module.exports = router;
