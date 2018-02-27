const {
  getPosts,
  createPost,
  newPost,
  showPost,
  updatePost,
  deletePost,
  editPost,
} = require('../controllers/postsController');
const express = require('express');

const router = express.Router();

/* GET index of all posts */
/* POST create a new post */
router.route('/')
  .get(getPosts)
  .post(createPost);

/* GET page to add a new post */
router.route('/new')
  .get(newPost);

/* GET page to show one post */
/* PUT update one post  */
/* DELETE destroy one post  */
router.route('/:titleSlug/:month/:year')
  .get(showPost)
  .put(updatePost)
  .delete(deletePost);

/* GET page to edit one post */
router.route('/:titleSlug/:month/:year/edit')
  .get(editPost);

module.exports = router;
