const express = require('express');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getpost,
} = require('../controllers/posts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getPosts).post(protect, createPost);
router
  .route('/:id')
  .get(protect, getpost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
